import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { updatePost } from '../redux/features/post/postSlice'

export const EditPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imageURL)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const resetSubmitHandle = () => {
    setTitle('')
    setText('')
  }
  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 cursor-pointer bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted">
        Прикрепить изображение
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setNewImage(e.target.files[0])
            setOldImage('')
          }}
        />
      </label>
      <div className="flex py-2">
        {oldImage && (
          <img src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
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
          onClick={submitHandler}
        >
          Обновить
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
