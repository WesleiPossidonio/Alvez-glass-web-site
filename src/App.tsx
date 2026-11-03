
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppRoutes } from './routes/routes'
import { AppProvider } from './contexts'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { CookiePopup } from './components/CookiePopup'

function App() {

  return (
    <>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      >
        <CookiePopup />
        <BrowserRouter>
          <AppProvider>
            <ToastContainer />
            <AppRoutes />
          </AppProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
