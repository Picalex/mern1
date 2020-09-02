import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {UserRoleEdit} from "../components/UserRoleEdit";



export const UserEditPage = ({}) => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const message = useMessage()
    const history = useHistory()
    const UserId = useParams().id
    const [localRole,setLocalRole]=useState([])
    const [user,setUser]=useState([])
    const [rolesIds,setRolesIds]=useState([])
    const [roles,setRoles]=useState([])
    const [form, setForm] = useState(
        {name:'',surname:'',roles:[],id:UserId}
    )
    const [testForm, setTestForm] = useState(
      {name:'',surname:'',roles:[],id:UserId}
    )

    const fetchUser = useCallback(async () => {
        try {

            const fetched = await request(`/api/user/info/${UserId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
            setForm(fetched)
            setTestForm(fetched)
            fetchRoles(fetched)
            setLocalRole(fetched.roles)
            setRolesIds(fetched.roles)
         } catch (e) {

        }
    }, [token, UserId, request])


    const fetchRoles = useCallback(async (array) => {
        try {


            const fetchedRoles = await request('/api/role', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setRoles(
                fetchedRoles.map((data)=>{
                    try{

                        const a = array.roles.includes(data._id)
                        return{
                            id:data._id,
                            status:a,
                            roleName:data.roleName
                        }
                    }catch (e) {
                        console.log(e)
                    }



                })
            )
        } catch (e) {}
    }, [token,  request])


  const EditHandler = async () => {
            if (form === testForm && rolesIds === localRole ) {
                message('пользователь не был изменен')
                history.push('/userDash')
            }


      try {

        const data = await request(`/api/user/edit`, 'POST', {...form},{
          Authorization: `Bearer ${token}`
        })
        message(data.message)
        history.push('/userDash')
      } catch (e) {
      }
   }




 function ChangeRole(id) {
       let array=rolesIds
        let test = array.find(role => role === id)
     if(test){
         array = array.filter(arr => arr !== id)

     }else{
         array.push(id)
     }




     const obj={
         name:form.name,
         surname:form.surname,
         roles:array,
         id:UserId
     }
     setRolesIds(array)

     setForm(obj)


}


  // async function ChangeRole (id) {
  //      const array=rolesIds
  //       const test = array.find(role => role === id)
  //
  //       if (test !== undefined) {
  //           console.log(array.filter(role => role !== id))
  //
  //           //const array2=
  //           //await setRolesIds(array2)
  //           // console.log(`filter ${array2}`)
  //           // console.log(`rolesIds ${rolesIds}`)
  //       } else {
  //
  //           await setRolesIds([...rolesIds,id])
  //           console.log(` add ${rolesIds}`)
  //       }
  //     console.log(`test ${test}`)
  //       const obj={
  //           name:form.name,
  //           surname:form.surname,
  //           roles:rolesIds
  //       }
  //           // console.log(obj)
  //           await setForm(obj)
  //           // console.log(`user.roles ${user.roles}`)
  //           //console.log(`form.roles ${form.roles}`)
  //
  //           // console.log(`rolesIds ${rolesIds}`)
  //           // console.log(`localRoles ${localRole}`)
  //   }


    const ChangeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value })
    }



  useEffect(() => {
      fetchUser()
      message()
  }, [ message,fetchUser])
    useEffect(() => {
        // console.log(`form ${form.name}`)
        // console.log(`form.roles ${form.roles}`)
        //console.log('useEffect',rolesIds)
    }, [rolesIds])


  if (loading) {
    return <Loader />
  }

  return (
      <form id='List1' name="form" >
          <h6>Имя</h6>
        <p>
          <input
              type="text"
              name="name"
              value={form.name}
              placeholder={form.name}
              onChange={ChangeHandler}
          /></p>
          <h6>Фамилия</h6>
        <p>
          <input
              type="text"
              name="surname"
              value={form.surname}
              placeholder={form.surname}
              onChange={ChangeHandler}
          /></p>
          <div>
            <UserRoleEdit  roles={roles} user={user} ChangeRole={ChangeRole}   />
          </div>
        <button
            type="button"
            className="ui red button"
            onClick={EditHandler}
            //disabled={}
        >
          Изменить
        </button>
      </form>
  )
}
