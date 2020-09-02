import {SHOW_ROLES,HIDE_ROLES} from "../types";

const handlers={
        [SHOW_ROLES]:(state,action) => action.payload,
        [HIDE_ROLES]:() => null,
        DEFAULT: state=>state
}
export  const RolesReducer = (state,action)=>{
    switch (action.type) {
        case   SHOW_ROLES: return action.payload
        case   HIDE_ROLES: return null
        default: return state
    }
}