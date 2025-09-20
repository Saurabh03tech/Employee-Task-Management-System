// src/context/AuthProvider.jsx
import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../utils/LocalStorage'

export const AuthContext = createContext({
  employee: [],
  admin: null,
  refreshAuth: () => {}
})

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ employee: [], admin: null })

  const refreshAuth = () => {
    const { employee, admin } = getLocalStorage()
    setAuthData({ employee: employee || [], admin: admin || null })
  }

  useEffect(() => {
    refreshAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ ...authData, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
