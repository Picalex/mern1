import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Loader} from "../components/Loader";
import {useMessage} from "../hooks/message.hook";
import {UsersList} from "../components/UsersList";
import {AddUser} from "../components/AddUser";

export const UserDashBoard = () => {
  const history = useHistory()
  const {loading, request} = useHttp()
  const message = useMessage()
  const {token} = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])



    const fetchRoles = useCallback(async () => {
        try {
            const fetched = await request('/api/role', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setRoles(fetched)
        } catch (e) {}
    }, [token, request])

  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request('/api/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      })

      setUsers(fetched)
    } catch (e) {}
  }, [token, request])

    const AddUserHandler = useCallback(async ({...form}) => {
        try {
            const data = await request('/api/user/create', 'POST', {...form},{
                Authorization: `Bearer ${token}`
            })
            message(data.message)
            fetchUsers()
        } catch (e) {
            console.log(e)
        }
        history.push('/UserDash')
    }, [token, request, message])


    const RemoveUserHandler = useCallback(async (user) => {
        try {
            const data = await request('/api/user/remove', 'POST', {user},{
                Authorization: `Bearer ${token}`
            })
            message(data.message)
            fetchUsers()
        } catch (e) {
            console.log(e)
        }
        history.push('/UserDash')
    }, [token, request, message])







  useEffect(() => {
      fetchRoles()
        fetchUsers()
  }, [fetchUsers,fetchRoles])




  if (loading) {
    return <Loader/>
  }

  return (
      <>
          <div >
              <div className="row">
                  <div className="col-8">
                      {!loading && <UsersList users={users} roles={roles} RemoveUserHandler={RemoveUserHandler} />}
                  </div>
                  <div className="col-4 ">
                      {!loading && <AddUser users={users} roles={roles} AddUserHandler={AddUserHandler}/>}
                  </div>
              </div>
          </div>
      </>
  )
}
