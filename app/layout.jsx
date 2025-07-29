// app/layout.jsx

export const metadata = {
  title: 'Undangan Pernikahan',
  description: 'Kami mengundang Anda untuk hadir di hari bahagia kami',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head />
      <body className="bg-pink-50 text-gray-800 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
