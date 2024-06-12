'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './../components/cores/Footer'
import Navbar from './../components/cores/Navbar'
import TanstackProvider from '@/provider/TanstackProvider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '@/config/context/userContext'
import { useState } from 'react'
import { SideBarContext } from '@/config/context/sideBarContext'
import ProtectedRouteProvider from '@/provider/ProtectedRoute'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userData, setUserData] = useState(null)
  const [sideBar, setSideBar] = useState(0)

  return (
    <SideBarContext.Provider value={{ sideBar, setSideBar }}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <html lang='en'>
          <body className={inter.className}>
            <ProtectedRouteProvider>
              <TanstackProvider>
                <Navbar />
                {children}
                <Footer />
                <ToastContainer />
              </TanstackProvider>
            </ProtectedRouteProvider>
          </body>
        </html>
      </UserContext.Provider>
    </SideBarContext.Provider>
  )
}
