'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Province {
  province_id: string
  province: string
}

interface City {
  city_id: string
  city_name: string
}

interface Cost {
  value: number
  etd: string
  note: string
}

export default function Home() {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [origin, setOrigin] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [courier, setCourier] = useState<string>('')
  const [result, setResult] = useState<Cost[] | null>(null)

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('/api/provinces')
        setProvinces(response.data)
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }

    fetchProvinces()
  }, [])

  const fetchCities = async (
    provinceId: string,
    type: 'origin' | 'destination'
  ) => {
    try {
      const response = await axios.get('/api/cities', {
        params: { province: provinceId },
      })
      if (type === 'origin') {
        setOrigin('')
      } else {
        setDestination('')
      }
      setCities(response.data)
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
  }

  const handleCheckOngkir = async () => {
    try {
      const response = await axios.post('/api/cost', {
        origin,
        destination,
        weight,
        courier,
      })
      setResult(response.data)
    } catch (error) {
      console.error('Error checking shipping cost:', error)
    }
  }

  return (
    <div>
      <h1>Cek Ongkir</h1>
      <div>
        <h2>Asal</h2>
        <select onChange={(e) => fetchCities(e.target.value, 'origin')}>
          <option value=''>Pilih Provinsi Asal</option>
          {provinces.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province}
            </option>
          ))}
        </select>
        <select onChange={(e) => setOrigin(e.target.value)} value={origin}>
          <option value=''>Pilih Kota Asal</option>
          {cities.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Tujuan</h2>
        <select onChange={(e) => fetchCities(e.target.value, 'destination')}>
          <option value=''>Pilih Provinsi Tujuan</option>
          {provinces.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        >
          <option value=''>Pilih Kota Tujuan</option>
          {cities.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Detail Pengiriman</h2>
        <input
          type='number'
          placeholder='Berat (gram)'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type='text'
          placeholder='Kurir'
          value={courier}
          onChange={(e) => setCourier(e.target.value)}
        />
      </div>
      <button onClick={handleCheckOngkir}>Cek Ongkir</button>

      {result && (
        <div>
          <h2>Hasil:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
