import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {NavbarT} from "./components/NavbarT";
import {Loader} from './components/Loader'
import {RolesContext} from "./context/Roles/RolesContext";
import "bootstrap/scss/bootstrap.scss"



function App() {
  const {token, login, logout, userId, ready, role} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated , role)

  if (!ready) {
    return <Loader />
  }

  return (
      <RolesContext.Provider value={{

      }}>
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated ,role
    }}>
      <Router>
        { isAuthenticated && <NavbarT /> }
        <div>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
      </RolesContext.Provider>
  )
}

export default App
