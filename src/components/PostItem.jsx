import React from 'react'
import { AiOutlineMessage, AiFillEye } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export const PostItem = ({ post }) => {
  if (!post) return

  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col basis-1/4">
        <div className={post.imageURL ? 'flex rounded-sm' : 'flex rounded-sm'}>
          {post.imageURL && (
            <img
              className="block mx-auto w-2/3"
              src={`http://localhost:3002/${post.imageURL}`}
              alt="Img"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-white opacity-50">{post.username}</div>
          <div className="text-xs text-white opacity-50">
            <Moment format="D-MMM-YYYY">{post.createdAt}</Moment>
          </div>
        </div>
        <div className="text-white text-xl"> {post.title} </div>
        <div className="text-white text-xs opacity-60 py-4">{post.text}</div>
        <div className="flex gap-3 items-center">
          <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage /> <span> {post.comment.length} </span>
          </button>
          <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
            <AiFillEye /> <span>{post?.views}</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
