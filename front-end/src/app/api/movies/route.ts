import { mockMovies } from '@/shared/mock/Movies'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const url = new URL(request.url)

  // If the request is made from localhost, it will be sent to the back-end API
  // Else, it will return a fake response with mock movies to test the front-end
  if (url.hostname != 'localhost') {
    //TODO: MUDAR PARA ==
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return NextResponse.json(data)
  } else {
    return NextResponse.json(mockMovies)
  }
}
