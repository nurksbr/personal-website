import { NextResponse } from 'next/server'

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

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/users/nurksbr/repos')
    if (!response.ok) throw new Error('Projeler yüklenemedi')
    
    const data: Project[] = await response.json() // Projeleri Project tipinde al
    return NextResponse.json(data)
  } catch (error) {
    console.error('GitHub projeleri yüklenirken hata:', error)
    return NextResponse.json({ error: 'Projeler yüklenemedi' }, { status: 500 })
  }
} 