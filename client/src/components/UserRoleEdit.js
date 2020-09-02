import React from "react";
import {ItemCheckbox} from "./ItemCheckbox";


export const UserRoleEdit=(props)=> {



    return (
        <div >

        {props.roles.map((role,index)=> <ItemCheckbox   key={index} role={role}  ChangeRole={props.ChangeRole}    />)}

    </div>
    )
}
