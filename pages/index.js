import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)


export default function Home() {
  const [url, setUrl] = useState('')
  const [short, setShort] = useState(null)

  const generateCode = () => Math.random().toString(36).substring(2, 8)

 const handleSubmit = async (e) => {
  e.preventDefault()
  const code = generateCode()
   if (!url.startsWith("http")) {
  alert("URL harus dimulai dengan http:// atau https://")
  return
}

  console.log("Trying to insert:", { code, url })

  const { error } = await supabase.from('links').insert({ code, url })

  if (error) {
    console.error("Insert error:", error)
    alert("Gagal menyimpan ke database.")
  } else {
    const shortUrl = `${window.location.origin}/${code}`
    setShort(shortUrl)
    console.log("Success, short URL:", shortUrl)
  }
}


  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Shortlink Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Masukkan URL tujuan"
          required
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Shorten
        </button>
      </form>
      {short && <p>Shortlink: <a href={short} target="_blank">{short}</a></p>}
    </div>
  )
}
