'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Swal from 'sweetalert2'

export default function HomePage() {
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.trim() === '') return

    const { error } = await supabase.from('guests').insert([{ name, is_attending: true }])
    if (!error) {
      setName('')
      Swal.fire({
        icon: 'success',
        title: 'Terima kasih!',
        text: 'Konfirmasi Anda telah diterima. Sampai jumpa di hari bahagia kami!',
        confirmButtonColor: '#ec4899',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Gagal menyimpan konfirmasi. Silakan coba lagi.',
        confirmButtonColor: '#ef4444',
      })
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-pink-100">
        <h1 className="text-4xl font-bold mb-4 text-pink-600">Undangan Pernikahan</h1>
        <p className="mb-6">Dengan penuh sukacita kami mengundang Anda untuk hadir di hari bahagia kami.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Nama Anda"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          >
            Konfirmasi Kehadiran
          </button>
        </form>
      </div>
    </main>
  )
}
