import React from "react";

export const ItemCheckbox=(props)=> {

    return (
        <p key={props.role.id} id='purple'>
            <label>
                <input
                    type="checkbox"
                    name={props.role.id}
                    value={props.role.roleName}
                    id={props.role.id}
                    defaultChecked={props.role.status}
                    onChange={(event) => {
                        props.ChangeRole(event.target.name)
                    }}

                />
                <span>{props.role.roleName}</span>
            </label>
        </p>
    )
}

