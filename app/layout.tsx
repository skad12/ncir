import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '../src/components/layouts/Navbar'
import Footer from '../src/components/layouts/Footer'
import { Toaster } from "sonner"



const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NCIR',
  description: 'National Cancer Imaging Repository',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="">
          {children}
        </main>
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  )
}
