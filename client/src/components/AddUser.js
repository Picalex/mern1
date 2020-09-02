import React, { useState} from 'react'
import {FormRoles} from "./FormRoles";

export const AddUser = (props) => {
    let rolesIds=[]
    const [form, setForm] = useState(
        {email:'',password:'',roles:[]}
    )
    function RoleUserAdd(id) {
       try{
           const test=rolesIds.find(role=>role===id)
           if(test!==undefined)
           {
               rolesIds=rolesIds.filter(roleId => roleId !== id)
           }else{
               rolesIds.push(id)
           }
       }catch (e) {
       }
        form.roles=rolesIds

    }
    const ChangeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value  })
    }

    return (
        <>
        <form>
            <div><h5 id='roleadd' >Добавление пользователя</h5>
                <input id='roleinput'
                    type="text"
                    name="email"
                    value={form.email}
                    placeholder=' Введите email '
                    onChange={ChangeHandler}
                /></div>
            <p><input id='roletable'
                       type="text"
                       name="password"
                       value={form.password}
                       placeholder=' Введите пароль '
                       onChange={ChangeHandler}
                /></p>
            <FormRoles  roles={props.roles} RoleUserAdd={RoleUserAdd} />
        </form >
            <button id='button-2' onClick={()=>props.AddUserHandler({...form})}>Добавить</button>
        </>

    )
}