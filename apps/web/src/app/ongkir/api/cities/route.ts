import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const province = searchParams.get('province')

  try {
    const response = await axios.get(
      'https://api.rajaongkir.com/starter/city',
      {
        headers: {
          key: '84cb49d7c4376a16cd454b56c1be74f6',
        },
        params: { province },
      }
    )

    return NextResponse.json(response.data.rajaongkir.results)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
