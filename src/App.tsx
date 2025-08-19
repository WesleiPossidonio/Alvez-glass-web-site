
import { BrowserRouter } from 'react-router'
import { AppRoutes } from './routes/routes'
import { AppProvider } from './contexts'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <BrowserRouter>
      <AppProvider>
        <ToastContainer />
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
