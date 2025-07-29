'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Swal from 'sweetalert2'

export default function HomePage() {
  const [name, setName] = useState('')
  const [daysLeft, setDaysLeft] = useState(null)
  const weddingDate = new Date('2025-12-12T10:00:00')

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const timeDiff = weddingDate - now
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
      setDaysLeft(days > 0 ? days : 0)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 86400000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.trim() === '') return

    const { error } = await supabase.from('guests').insert([{ name, is_attending: true }])
    if (!error) {
      setName('')
      Swal.fire({
        icon: 'success',
        title: 'Terima kasih!',
        text: 'Sampai jumpa di hari bahagia kami!',
        confirmButtonColor: '#db2777',
      })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 flex flex-col items-center justify-center p-4 sm:p-6 text-center font-sans">
      <div className="bg-white/90 backdrop-blur-sm border border-rose-100 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 max-w-lg w-full space-y-8 transform transition-all duration-500">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 tracking-tight animate-fade-in">
          Undangan Pernikahan
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Dengan penuh cinta kami mengundang Anda untuk menghadiri pernikahan kami
        </p>

        <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-rose-500">
          💞 Aisyah & Dimas
        </div>

        <div className="bg-rose-50 rounded-2xl py-4 px-6 transition-all duration-300 hover:shadow-md">
          <p className="text-sm text-gray-600">Akad & Resepsi</p>
          <p className="font-semibold text-lg sm:text-xl text-rose-700">
            12 Desember 2025 - 10:00 WIB
          </p>
          {daysLeft !== null && (
            <p className="text-sm text-gray-500 mt-2">
              🎉 {daysLeft} hari lagi menuju hari H
            </p>
          )}
        </div>

        <div className="bg-rose-50 rounded-2xl py-4 px-6 transition-all duration-300 hover:shadow-md">
          <p className="text-sm text-gray-600">Lokasi</p>
          <p className="font-semibold text-lg sm:text-xl text-rose-700">
            Gedung Serbaguna Sakura, Bandung
          </p>
          <a
            href="https://maps.google.com/?q=Gedung+Serbaguna+Sakura+Bandung"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 text-sm underline hover:text-rose-800 transition-colors"
          >
            📍 Lihat di Google Maps
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-rose-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all duration-300 placeholder-gray-400 text-gray-800"
            placeholder="Masukkan Nama Anda"
          />
          <button
            type="submit"
            className="w-full bg-rose-500 text-white px-4 py-3 rounded-lg hover:bg-rose-600 focus:ring-4 focus:ring-rose-200 transition-all duration-300 font-semibold"
          >
            Konfirmasi Kehadiran
          </button>
        </form>
      </div>

      <footer className="mt-8 sm:mt-10 text-sm text-gray-500">
        Dibuat dengan 💕 oleh Aisyah & Dimas
      </footer>
    </main>
  )
}