import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CheckIsAuth, logout } from '../redux/features/auth/authSlice'

export const NavBar = () => {
  const isAuth = useSelector(CheckIsAuth)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="flex py-4 justify-between items-center">
      <Link
        to={'/'}
        className={`flex justify-center items-center p-2 bg-gray-600 text-xs text-white rounded-sm ${
          user ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {user?.username}
      </Link>
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={'/'}
              style={({ isActive }) =>
                isActive ? { color: 'white' } : undefined
              }
              className="text-xs text-gray-400 hover:text-white"
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/posts'}
              style={({ isActive }) =>
                isActive ? { color: 'white' } : undefined
              }
              className="text-xs text-gray-400 hover:text-white"
            >
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/new'}
              style={({ isActive }) =>
                isActive ? { color: 'white' } : undefined
              }
              className="text-xs text-gray-400 hover:text-white"
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={() => handleLogout()}>Выйти</button>
        ) : (
          <Link to={'/login'}>Войти</Link>
        )}
      </div>
    </div>
  )
}
