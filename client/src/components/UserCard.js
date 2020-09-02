import React from "react";

export const UserCard = ({ user }) => {
    return (
        <>

            <h5>Профиль</h5>
            <div id='Test'><p>Имя: {user.name}</p></div>
            <div id='Test'><p>Фамилия:{user.surname}</p></div>
            <div id='Test'><p>роли:
            {user.roles.map((roles,index)=>{
                return roles
            })}
            </p></div>


        </>

    )
}
