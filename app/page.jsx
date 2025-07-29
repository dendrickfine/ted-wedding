'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function HomePage() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState([])

  const fetchGuests = async () => {
    const { data, error } = await supabase.from('guests').select('*').order('created_at', { ascending: false })
    if (!error) setGuests(data)
  }

  useEffect(() => {
    fetchGuests()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.trim() === '') return

    const { error } = await supabase.from('guests').insert([{ name, is_attending: true }])
    if (!error) {
      setName('')
      fetchGuests()
    }
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Undangan Pernikahan</h1>
      <p className="text-center mb-6">Silakan isi nama Anda untuk konfirmasi kehadiran.</p>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded"
          placeholder="Nama Anda"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Konfirmasi
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Daftar Tamu Hadir:</h2>
      <ul className="list-disc list-inside">
        {guests.map((guest) => (
          <li key={guest.id}>{guest.name}</li>
        ))}
      </ul>
    </main>
  )
}
