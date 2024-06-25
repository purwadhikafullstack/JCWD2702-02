'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './../components/cores/Footer'
import Navbar from './../components/cores/Navbar'
import AdminSidebar from '@/components/cores/AdminSidebar'
import TanstackProvider from '@/provider/TanstackProvider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '@/config/context/userContext'
import { useState } from 'react'
import { SideBarContext } from '@/config/context/sideBarContext'
import { CartContext } from '@/config/context/cartContext'
import ProtectedRouteProvider from '@/provider/ProtectedRoute'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userData, setUserData] = useState(null)
  const [sideBar, setSideBar] = useState(0)
  const [cartData, setCartData] = useState(null)

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      <SideBarContext.Provider value={{ sideBar, setSideBar }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <html lang='en'>
            <body className={inter.className}>
              <TanstackProvider>
                <Navbar />
                <div className='flex min-h-screen'>
                  <AdminSidebar />
                  <main className='flex-1 p-4'>{children}</main>
                </div>
                <Footer />
              </TanstackProvider>
              <ToastContainer />
            </body>
          </html>
        </UserContext.Provider>
      </SideBarContext.Provider>
    </CartContext.Provider>
  )
}
