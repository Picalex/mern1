import React from "react";

export const FormRoles=(props)=> {
    const roles = props.roles



    return (<div id='roleform'>
        {roles.map((role,index)=> {

            return (

                <p key={role._id} id='purple'>
                    <label>
                        <input
                            type="checkbox"
                            name={role._id}
                            value={role.roleName}
                            id={role._id + 1}
                            onChange={()=>props.RoleUserAdd(role._id)}
                        />
                        <span>{role.roleName}</span>
                    </label>
                </p>
            )
        })}

            </div>)
}
