import { supabase } from '../lib/supabaseClient'

export async function getServerSideProps({ params }) {
  const { data, error } = await supabase
    .from('links')
    .select('url')
    .eq('code', params.code)
    .single()

  if (!data || error) {
    return { notFound: true }
  }

  return {
    props: { url: data.url },
  }
}

export default function RedirectPage({ url }) {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`5;url=${url}`} />
        <style>{`body,html{margin:0;padding:0}`}</style>
      </head>
      <body>
        <iframe src={process.env.ADSTERRA_URL} style={{ width: "100vw", height: "100vh", border: "none" }} />
      </body>
    </html>
  )
}
