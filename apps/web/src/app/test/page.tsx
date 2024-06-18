'use client'
import { useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface ILocation {
  lat: number
  lng: number
}

const GeocodeMap = () => {
  const [address, setAddress] = useState<string>('')
  const [location, setLocation] = useState<ILocation | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleSearch = async () => {
    console.log(address)
    const apiKey = '3ddb953b42144d3c9b1986e546497e69' // Replace with your OpenCage API key
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`
      )
      const { lat, lng } = response.data.results[0].geometry
      setLocation({ lat, lng })
      console.log(lat)
      console.log(lng)
      console.log(response)
    } catch (error) {
      console.error('Error fetching geocoding data:', error)
    }
  }

  return (
    <div className='h-screen'>
      <input
        type='text'
        value={address}
        onChange={handleInputChange}
        placeholder='Enter an address'
      />
      <button onClick={handleSearch}>Search</button>

      {location && (
        <MapContainer
          center={[location.lat, location.lng] as [number, number]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lng] as [number, number]}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  )
}

export default GeocodeMap
