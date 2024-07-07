import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(
      'https://api.rajaongkir.com/starter/province',
      {
        headers: {
          key: '84cb49d7c4376a16cd454b56c1be74f6',
        },
      }
    )

    return NextResponse.json(response.data.rajaongkir.results)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
