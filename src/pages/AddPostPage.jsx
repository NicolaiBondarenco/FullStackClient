import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPost } from '../redux/features/post/postSlice'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submithandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
      resetSubmitHandle()
    } catch (error) {
      return toast.warning('Что-то пошло не так!')
    }
  }

  const resetSubmitHandle = () => {
    setTitle('')
    setText('')
  }

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 cursor-pointer bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted">
        Прикрепить изображение
        <input
          type="file"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div className="flex py-2">
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
      </div>
      <label className="text-white text-xs opacity-70">
        Заголовок поста:
        <input
          type="text"
          placeholder="Заголовок поста"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border p-1 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-white text-xs opacity-70">
        Текст поста:
        <textarea
          placeholder="Текст поста"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 text-black w-full resize-none h-40 rounded-lg bg-gray-400 border p-1 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
          onClick={submithandler}
        >
          Добавить
        </button>
        <button
          className="flex justify-center items-center bg-red-600 text-xs text-white rounded-sm py-2 px-4"
          onClick={resetSubmitHandle}
        >
          Отменить
        </button>
      </div>
    </form>
  )
}
