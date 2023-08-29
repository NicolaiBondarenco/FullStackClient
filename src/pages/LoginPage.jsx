import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, CheckIsAuth } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(CheckIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const showStatus = () => {
    if (
      status === 'Такого пользователя не существует!' ||
      status === 'Неверный логин или пароль!'
    )
      return toast.warning(status)
    toast.success(status)
  }

  useEffect(() => {
    showStatus()
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    if (!username && !password) return
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="w-1/4 h-60 mx-auto mt-40"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-lg text-white text-center">Авторизация</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 mb-3 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          className="flex justify-center items-center text-xs text-white rounded-sm px-4 py-2 bg-gray-500"
          type="submit"
          onClick={handleSubmit}
        >
          Войти
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-white text-xs"
        >
          Нет аккаунта?
        </Link>
      </div>
    </form>
  )
}
