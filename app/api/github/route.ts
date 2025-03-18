import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/users/nurksbr/repos?sort=updated&per_page=6', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      throw new Error('GitHub API yanıt vermedi')
    }

    const repos = await response.json()
    
    // Sadece gerekli bilgileri alıyoruz
    const formattedRepos = repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      topics: repo.topics || [],
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
    }))

    return NextResponse.json(formattedRepos)
  } catch (error) {
    console.error('GitHub API hatası:', error)
    return NextResponse.json({ error: 'Projeler yüklenirken bir hata oluştu' }, { status: 500 })
  }
} 