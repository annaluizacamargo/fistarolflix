import { mockMovies } from '@/shared/mock/Movies'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const pageNumber = Number(url.searchParams.get('pageNumber'))
  const pageSize = Number(url.searchParams.get('pageSize'))

  // If the request is made from localhost, it will be sent to the back-end API
  // Else, it will return a fake response with mock movies to test the front-end
  if (url.hostname == 'localhost') {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movies?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return NextResponse.json(data)
  } else {
    return NextResponse.json(mockMovies)
  }
}
