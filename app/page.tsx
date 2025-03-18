import Image from "next/image";

async function getGithubProjects() {
  try {
    const response = await fetch('http://localhost:3000/api/github', { cache: 'no-store' })
    if (!response.ok) throw new Error('Projeler yüklenemedi')
    return response.json()
  } catch (error) {
    console.error('GitHub projeleri yüklenirken hata:', error)
    return []
  }
}

export default async function Home() {
  const projects = await getGithubProjects()

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Merhaba, Ben <span className="text-indigo-600">Fevziye Nur Kesebir</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Full Stack Developer olarak modern web teknolojileri ile kullanıcı dostu ve ölçeklenebilir uygulamalar geliştiriyorum.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href="#iletisim" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
              >
                İletişime Geç
              </a>
              <a 
                href="#projeler" 
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors duration-300"
              >
                Projelerimi Gör
              </a>
            </div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative rounded-full overflow-hidden border-4 border-indigo-600 shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Fevziye Nur Kesebir"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hakkımda Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Hakkımda</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Merhaba! Ben Fevziye Nur Kesebir. Modern web teknolojilerinde uzmanlaşmış bir yazılım geliştiricisiyim. 
            React, Next.js, Node.js ve TypeScript gibi teknolojilerle kullanıcı dostu ve performanslı 
            web uygulamaları geliştiriyorum. Sürekli öğrenmeye ve kendimi geliştirmeye odaklanıyorum.
          </p>
        </div>
      </section>

      {/* Yetenekler Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Yeteneklerim</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Git'].map((skill) => (
            <div key={skill} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-indigo-50 transition-colors duration-300">
              <span className="text-gray-700 font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projeler Section */}
      <section id="projeler" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Projelerim</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project: any) => (
            <a 
              key={project.name}
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                      className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                  {project.language && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                      {project.language}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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

      {/* İletişim Section */}
      <section id="iletisim" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">İletişim</h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid gap-6">
            <div className="flex items-center gap-4 hover:bg-indigo-50 p-4 rounded-lg transition-colors duration-300">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a 
                href="mailto:fevziyenurksbr1@gmail.com"
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
              >
                fevziyenurksbr1@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4 hover:bg-indigo-50 p-4 rounded-lg transition-colors duration-300">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/fevziyenurkesebir/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.018-2.013-1.226-2.013-1.226 0-1.414.957-1.414 1.951v5.666h-3v-11h2.85v1.638h.04c.492-.933 1.693-1.917 3.485-1.917 3.724 0 4.615 2.452 4.615 5.646v6.633z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
