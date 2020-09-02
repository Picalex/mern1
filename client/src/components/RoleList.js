import React from 'react'


export const RoleList = ( props ) => {


    return (
        <table className="striped">
            <thead>
            <tr>
                <th>Number</th>
                <th>Name</th>
            </tr>
            </thead>

            <tbody>
            { props.roles.map((role, index) => {
                return (
                    <tr key={role._id}>
                        <td>{index + 1}</td>
                        <td>{role.roleName}</td>
                        <td><button onClick={() => props.RemoveRoleHandler(role)}>удалить</button></td>
                    </tr>
                )
            }) }
            </tbody>

        </table>


    )
}
