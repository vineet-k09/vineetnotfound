// src/app/api/location/route.ts
export async function GET() {
    try {
      // https://ipapi.co/json/
      const res = await fetch('https://ipwho.is/', {
        cache: 'no-store',
      })
  
      if (!res.ok) {
        console.error(`[IPAPI] Fetch failed: ${res.status}`, res.text)
        return new Response('Failed to fetch IP data from provider', { status: 500 })
      }
  
      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.error('[IPAPI] Response was not JSON:', await res.text())
        return new Response('Invalid data format from IP API', { status: 500 })
      }
  
      const data = await res.json()
      return Response.json(data)
    } catch (err) {
      console.error('[IPAPI ERROR]', err)
      return new Response('Failed to fetch location', { status: 500 })
    }
  }