import React from "react";
import {RolesContext} from "./RolesContext";

export const RolesState=({children})=>{
    function f() {

    }
    return(
        <RolesContext.Provider>
            {children}
        </RolesContext.Provider>
    )
}