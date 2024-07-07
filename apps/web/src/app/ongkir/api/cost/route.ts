import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  const { origin, destination, weight, courier } = await req.json()

  try {
    const response = await axios.post(
      'https://api.rajaongkir.com/starter/cost',
      new URLSearchParams({ origin, destination, weight, courier }),
      {
        headers: {
          key: '84cb49d7c4376a16cd454b56c1be74f6',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    return NextResponse.json(response.data.rajaongkir.results)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
