import React from 'react'
import {NavLink,Link} from "react-router-dom";
import {SelectRole} from "./SelectRole";
export const UsersList = ( props ) => {


    return (
        <table className="table table-bordered table-dark table_wight">
            <thead>
            <tr>
                <th>№</th>
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Roles</th>
                <th>Profile</th>
                <th>Edit Profile</th>
            </tr>
            </thead>

            <tbody>
            { props.users.map((user, index) => {
                return (
                    <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td><SelectRole user={user} roles={props.roles} /></td>
                        <td><Link to={`/user/info/${user._id}`}><i  id="purple"  className="small material-icons">
                            <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-person-square"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fillRule="evenodd"
                                  d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg></i></Link></td>
                        <td><NavLink to={`/user/edit/${user._id}`}><i  id="purple"  className="small material-icons">
                            <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-pencil-square"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg></i></NavLink></td>
                        <td><button  onClick={()=>props.RemoveUserHandler(user)}>удалить</button></td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}
