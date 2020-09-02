import {createContext} from 'react'

function noop() {}

export const Roles1Context = createContext({
    roleId: null,
    roleName: null,
})
