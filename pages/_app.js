import 'tailwindcss/tailwind.css'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return <div><Component {...pageProps} /><Footer /></div>
}

export default MyApp
