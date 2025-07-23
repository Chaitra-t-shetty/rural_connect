import React, { createContext } from 'react'
export const authDataContext = createContext()
function AuthContext({children}) {
const serverUrl = "https://rural-connect-backend-qf8v.onrender.com"
  let value = {
    serverUrl
  }
  return (
    <div >
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
      
    </div>
  )
}

export default AuthContext
