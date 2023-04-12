import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

// styles 
import '@/styles/globals.css'
import '@/styles/tailwind.css'
import '@/styles/plugins.css'
import '@/styles/custom.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
