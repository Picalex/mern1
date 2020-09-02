import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  userRoles:[],
  login: noop,
  logout: noop,
  isAuthenticated: false
})
