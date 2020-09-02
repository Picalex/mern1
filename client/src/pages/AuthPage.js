import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }


  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
        auth.login(data.token, data.userId,data.role)
    } catch (e) {}
  }

  return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
            <input
                className="form-control"
                type="text"
                name="email"
                value={form.email}
                onChange={changeHandler}
            />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
            <input
                className="form-control"
                type="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
            />
        </div>
        <button

            className="btn btn-primary"
            style={{marginRight: 10}}
            disabled={loading}
            onClick={loginHandler}
        >
          Войти
        </button>
      </form>






  )
}
