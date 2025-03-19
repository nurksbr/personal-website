'use client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image';

import { useState, useEffect } from "react";

interface Project {
  id: number;
  name: string;
  html_url: string;
  description: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  updated_at: string;
}

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [activeTab, setActiveTab] = useState('hakkimda')

  useEffect(() => {
    // Sayfa yüklendiğinde hero section'a git
    const heroSection = document.querySelector('section:first-of-type')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'instant' })
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    const fetchProjects = async (): Promise<Project[]> => {
      try {
        const response = await fetch('https://api.github.com/users/nurksbr/repos') // GitHub API'den projeleri al
        if (!response.ok) throw new Error('Projeler yüklenemedi')
        const data: Project[] = await response.json() // Projeleri Project tipinde al
        setProjects(data)
        return data
      } catch (error) {
        console.error('GitHub projeleri yüklenirken hata:', error)
        return []
      }
    }

    window.addEventListener('scroll', handleScroll)
    fetchProjects()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tabs = [
    { id: 'hakkimda', label: 'Hakkımda' },
    { id: 'sertifikalar', label: 'Sertifikalar' },
    { id: 'deneyim', label: 'Deneyim' },
    { id: 'projeler', label: 'Projeler' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold">Fevziye Nur Kesebir</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Full Stack Developer olarak modern web teknolojileri ile kullanıcı dostu ve ölçeklenebilir uygulamalar geliştiriyorum.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-violet-100 -mt-12">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 text-base font-semibold whitespace-nowrap border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-violet-600 text-violet-600 bg-violet-50/50'
                    : 'border-transparent text-gray-500 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hakkımda Tab */}
        {activeTab === 'hakkimda' && (
          <section className="max-w-4xl mx-auto space-y-8">
            {/* Kişisel Bilgiler */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-violet-100">
              <div className="p-8">
                <p className="text-gray-600 leading-relaxed">
                  Merhaba! Ben Fevziye Nur Kesebir. Yazılım geliştirme konusunda tutkulu ve sürekli öğrenmeye açık biriyim. Modern web teknolojileri ve yapay zeka alanlarında çalışmalar yapıyorum.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Şu anda Next.js, React ve TypeScript ile modern web uygulamaları geliştirirken, Python ile yapay zeka ve makine öğrenmesi projeleri üzerinde çalışıyorum. Özellikle doğal dil işleme ve görüntü işleme alanlarında kendimi geliştirmeye çalışıyorum.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Ayrıca, UI/UX tasarımı konusunda da kendimi geliştirmeye çalışıyorum ve kullanıcı deneyimini ön planda tutan, modern ve etkileyici arayüzler tasarlamayı hedefliyorum.
                </p>
              </div>
            </div>

            {/* Eğitim */}
            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 rounded-xl shadow-lg border border-violet-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Eğitim</h3>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <a 
                    href="https://yazilimtf.firat.edu.tr/"
            target="_blank"
            rel="noopener noreferrer"
                    className="text-xl font-semibold text-gray-900 mb-1 hover:text-violet-600 transition-colors duration-300"
                  >
                    Fırat Üniversitesi
                  </a>
                  <p className="text-gray-600 mb-2">Lisans, Yazılım Mühendisliği</p>
                  <p className="text-sm text-violet-600">Eylül 2023 - Haziran 2027</p>
                </div>
              </div>
            </div>

            {/* Yetenekler */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-violet-100">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Yetenekler</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'React', 
                    'Next.js', 
                    'TypeScript', 
                    'Python',
                    'Tailwind CSS', 
                    'Node.js', 
                    'Machine Learning',
                    'NLP'
                  ].map((skill) => (
                    <div key={skill} className="bg-gradient-to-br from-violet-50 to-fuchsia-50 p-3 rounded-lg text-center hover:from-violet-100 hover:to-fuchsia-100 transition-all duration-300 shadow-md hover:shadow-lg border border-violet-100">
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* İletişim */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-violet-100">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">İletişim</h3>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4 hover:bg-violet-50 p-4 rounded-lg transition-all duration-300">
                    <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a 
                      href="mailto:fevziyenurksbr1@gmail.com"
                      className="text-gray-700 hover:text-violet-600 transition-colors duration-300"
                    >
                      fevziyenurksbr1@gmail.com
          </a>
        </div>
                  <div className="flex items-center gap-4 hover:bg-violet-50 p-4 rounded-lg transition-all duration-300">
                    <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">Elazığ / Batman, Türkiye</span>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-8">
                    <a 
                      href="https://github.com/nurksbr" 
          target="_blank"
          rel="noopener noreferrer"
                      className="text-gray-600 hover:text-violet-600 transition-colors duration-300"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
        </a>
        <a
                      href="https://www.linkedin.com/in/fevziyenurkesebir/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-violet-600 transition-colors duration-300"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sertifikalar Tab */}
        {activeTab === 'sertifikalar' && (
          <section className="max-w-4xl mx-auto space-y-6">
            {[
              {
                title: "Python for Data Science and Machine Learning Bootcamp",
                issuer: "Udemy",
                date: "2023",
                link: "https://www.udemy.com/certificate/UC-1234567890/"
              },
              {
                title: "React - The Complete Guide",
                issuer: "Udemy",
                date: "2023",
                link: "https://www.udemy.com/certificate/UC-0987654321/"
              },
              {
                title: "Next.js 13 & React - The Complete Guide",
                issuer: "Udemy",
                date: "2023",
                link: "https://www.udemy.com/certificate/UC-1122334455/"
              }
            ].map((cert) => (
              <div key={cert.title} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{cert.title}</h3>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 mt-1">{cert.date}</p>
                  </div>
                  <a 
                    href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
                    className="text-violet-600 hover:text-violet-700 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Deneyim Tab */}
        {activeTab === 'deneyim' && (
          <section className="max-w-4xl mx-auto space-y-8">
            {[
              {
                title: "Yazılım Mühendisi",
                company: "Inspimo Consultancy",
                period: "Ağustos 2024 - Ekim 2024",
                location: "Elazığ, Türkiye",
                type: "Stajyer",
                workType: "Uzaktan"
              },
              {
                title: "Görevlendirme Yöneticisi",
                company: "Fırat Üniversitesi Bilişim Ve Eğitim Topluluğu(FÜBET)",
                period: "Mayıs 2024 - Ekim 2024",
                location: "Elazığ, Türkiye",
                type: "Tam zamanlı",
                workType: "Ofisten"
              },
              {
                title: "Siber Güvenlik Uzmanı",
                company: "Code 23 Fırat",
                period: "Şubat 2024 - Ağustos 2024",
                location: "Elazığ, Türkiye",
                type: "Dönemsel",
                workType: "Ofisten"
              },
              {
                title: "Bilgisayar Donanım Teknisyeni",
                company: "Ks1 Teknoloji",
                period: "Haziran 2020 - Ağustos 2023",
                location: "Batman, Türkiye",
                type: "Tam zamanlı",
                workType: "Ofisten"
              },
              {
                title: "Bilişim Teknolojileri",
                company: "Türkiye Petrolleri A.O.",
                period: "Eylül 2019 - Haziran 2020",
                location: "Batman, Türkiye",
                type: "Stajyer",
                workType: "Ofisten"
              }
            ].map((job) => (
              <div key={job.title} className="bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 rounded-xl shadow-lg border border-violet-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-sm text-violet-600">{job.period}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{job.type}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{job.workType}</span>
                </div>
                <p className="text-gray-600">{job.location}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projeler Tab */}
        {activeTab === 'projeler' && (
          <section className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project: Project) => (
                <a 
                  key={project.name}
                  href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
                  className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {project.description || 'Açıklama bulunmuyor'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.topics.map((topic: string) => (
                        <span 
                          key={topic}
                          className="px-3 py-1 bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                      {project.language && (
                        <span className="px-3 py-1 bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 rounded-full text-sm">
                          {project.language}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.stargazers_count}
                      </span>
                      <span>
                        Son güncelleme: {new Date(project.updated_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-3 rounded-full shadow-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300 z-50"
          aria-label="Yukarı çık"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </main>
  );
}
