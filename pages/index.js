import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [guests, setGuests] = useState([])
  const [name, setName] = useState("")

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    let { data } = await supabase.from('guests').select('*')
    setGuests(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.trim() === "") return

    await supabase.from('guests').insert([{ name, is_attending: true }])
    setName("")
    fetchGuests()
  }

  return (
    <div className="p-4">
      <h1>Undangan Pernikahan</h1>
      <p>Kami mengundang Anda untuk hadir dalam pernikahan kami.</p>

      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nama Anda" />
        <button type="submit">Konfirmasi Kehadiran</button>
      </form>

      <h2>Daftar Tamu Hadir</h2>
      <ul>
        {guests.map(guest => (
          <li key={guest.id}>{guest.name}</li>
        ))}
      </ul>
    </div>
  )
}
