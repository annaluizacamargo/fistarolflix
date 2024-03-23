import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const postData = await request.json()

  if (!postData.isMock) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return NextResponse.json({ ...data.data, token: data.token })
  } else {
    return new Response(JSON.stringify(postData), { headers: { 'Content-Type': 'application/json' } })
  }
}
