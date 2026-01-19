import { useContext } from 'react'

import { AuthContext } from '../contexts'

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  return authContext
}

export default useAuth