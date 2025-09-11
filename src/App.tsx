

import { AppRoutes } from './routes/routes'
import { AppProvider } from './contexts'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
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
