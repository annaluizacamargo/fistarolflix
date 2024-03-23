import { IUser } from '@/types/user'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const url = new URL(request.url)

  // If the request is made from localhost, it will be sent to the back-end API
  // Else, it will return a fake response with a fake token to test the front-end
  if (url.hostname == 'localhost') {
    try {
      const postData = await request.json()
      const { email, password, name } = postData

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      return NextResponse.json({ ...data, isMock: false })
    } catch (error) {
      return NextResponse.error()
    }
  } else {
    const fakeData: IUser = {
      id: 1,
      name: 'Usuário Teste',
      email: 'usuario@teste.com',
      password: await hash('Wa123456', 8),
      isActive: true,
    }

    const fakeToken = jwt.sign(
      {
        id: fakeData.id,
        name: fakeData.name,
        email: fakeData.email,
        isActive: fakeData.isActive,
      },
      process.env.NEXT_PUBLIC_SECRET_KEY || '',
      { expiresIn: '1h' }
    )

    return new Response(JSON.stringify({ ...fakeData, token: fakeToken, isMock: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
