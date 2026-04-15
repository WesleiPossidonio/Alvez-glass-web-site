

import { AppRoutes } from './routes/routes'
import { AppProvider } from './contexts'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { CookiePopup } from './components/CookiePopup'

function App() {

  return (
    <>
      <CookiePopup />
      <BrowserRouter>
        <AppProvider>

          <ToastContainer />
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </>
  )
}

export default App
