
import { Navigate, Outlet } from 'react-router-dom'
import { decodeToken } from '@/utils/DecodeToken'

export const PrivateRoutesClients = () => {

  const token = localStorage.getItem(
    'AlvesClass:userData1.0',
  )

  const dataUser = decodeToken(token)

  return token !== null && (dataUser?.role === 'client') ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  )
}
