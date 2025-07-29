// app/layout.jsx
import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata = {
  title: 'Undangan Pernikahan',
  description: 'Kami mengundang Anda untuk hadir di hari bahagia kami',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head />
      <body className={`${plusJakarta.className} bg-pink-50 text-gray-800 antialiased`}>
        {children}
      </body>
    </html>
  )
}
