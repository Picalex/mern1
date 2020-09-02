import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from "../components/Loader";
import {RoleList} from "../components/RoleList";
import {useMessage} from "../hooks/message.hook";
import {AddRole} from "../components/AddRole";

export const RoleDashBoard = () => {
  const history = useHistory()
  const {loading, request} = useHttp()
  const message = useMessage()
  const {token} = useContext(AuthContext)
  const [roles, setRoles] = useState([])

  const ListContext = React.createContext([])
  const fetchRoles = useCallback(async () => {
    try {
      const fetched = await request('/api/role', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setRoles(fetched)
    } catch (e) {}
  }, [token, request])



  const AddRoleHandler = useCallback(async ({...form}) => {
    try {
      const data = await request('/api/role/create', 'POST', {...form},{
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      fetchRoles()
    } catch (e) {
      console.log(e)
    }
    history.push('/RoleDash')
  }, [token, request, message])

  const RemoveRoleHandler = useCallback(async (role) => {
    try {
      const data = await request('/api/role/remove', 'POST', {role},{
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      fetchRoles()
    } catch (e) {
      console.log(e)
    }
    history.push('/RoleDash')
  }, [token, request, message])


  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])



  if (loading) {
    return <Loader/>
  }

  return (
      <>
        <ListContext.Provider>
        <div className="box">
            <div id='box-fon1'>
              <h2>Role List</h2>
              {!loading && <RoleList roles={roles} RemoveRoleHandler={RemoveRoleHandler}/>}
            </div>
            <div id='box-fon'>
              {!loading && <AddRole  AddRoleHandler={AddRoleHandler}  />}
            </div>
        </div>
        </ListContext.Provider>
      </>
  )
}
