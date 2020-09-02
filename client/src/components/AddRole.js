import React, { useState} from 'react'



export const AddRole = (props) => {


    const [form, setForm] = useState(
        {name:'',rights:''}
    )

    const ChangeHandler = event => {
            setForm({ ...form, [event.target.name]: event.target.value })
    }




    return (
        <>
        <form>
            <div><h5 id='roleadd'>Добавление роли</h5></div>
            <p>
                <input id='roleinput'
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder=' Введите роль '
                    onChange={ChangeHandler}
                /></p>
            <p>
                <input id='roleinput'
                       type="text"
                       name="rights"
                       value={form.rights}
                       placeholder=' Введите права'
                       onChange={ChangeHandler}
                /></p>
        </form>
            <button
                id='button-2'
                onClick={()=>props.AddRoleHandler({...form}) }
            >
                Добавить
            </button>
        </>

    )
}