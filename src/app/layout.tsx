import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import type React from 'react'
import './globals.css'

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Avo Dashboard',
  description: 'Avo Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${openSans.className} antialiased`}>{children}</body>
    </html>
  )
}
