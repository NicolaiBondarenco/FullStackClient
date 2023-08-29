import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  AiOutlineMessage,
  AiFillEye,
  AiTwotoneEdit,
  AiFillDelete,
} from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { removeMyPost } from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'
import Moment from 'react-moment'
import axios from '../utils/axios'
import { createComment } from '../redux/features/comment/commentSlice'

export const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const { user } = useSelector((state) => state.auth)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const removePostHandler = () => {
    dispatch(removeMyPost(params.id))
    toast.success('Пост удален!')
    navigate('/posts')
  }

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeComment = (value) => {
    setComment(value)
  }

  if (!post) {
    return (
      <div className="text-xl text-center text-white p-10">
        Постов не существует!
      </div>
    )
  }

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs rounded-sm py-2 px-4">
        <Link to={'/'}>Назад</Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={post?.imageURL ? 'flex rounded-sm' : 'flex rounded-sm'}
            >
              {post?.imageURL && (
                <img
                  className="block mx-auto w-2/3"
                  src={`http://localhost:3002/${post?.imageURL}`}
                  alt="Img"
                />
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">
                {post?.username}
              </div>
              <div className="text-xs text-white opacity-50">
                <Moment format="D-MMM-YYYY">{post?.createdAt}</Moment>
              </div>
            </div>
            <div className="text-white text-xl"> {post?.title} </div>
            <div className="text-white text-xs opacity-60 py-4">
              {post?.text}
            </div>
            <div className="flex justify-between gap-3 items-center">
              <div className="flex gap-3 mt-4">
                <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage /> <span> {post?.comment?.length | 0}</span>
                </button>
                <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye /> <span> {post?.views} </span>
                </button>
              </div>

              {user?._id === post?.author && (
                <div className="flex gap-3 mt-4">
                  <button className="flex justify-center items-center gap-2 text-white opacity-50">
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button
                    onClick={removePostHandler}
                    className="flex justify-center items-center gap-2 text-white opacity-50"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Comment"
              value={comment}
              onChange={(e) => handleChangeComment(e.target.value)}
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="flex justify-content items-center bg-gray-400 text-xs text-white rounded-sm p-2 px-4"
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
