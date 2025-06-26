import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../../App'
import Footer from '../Footer'
import Navbar from '../Navbar'

const DefaultLayout = ({children}) => {
  return (
    <div>
  <Navbar/>
{children}

    <Footer/>

    </div>
  )
}

export default DefaultLayout