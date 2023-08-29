import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from '../components/PostItem'
import { PopularPost } from '../components/PopularPost'
import { getAllPosts } from '../redux/features/post/postSlice'

export const MainPage = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  if (!posts.length) {
    return (
      <div className="text-center text-xl py-10 text-white">
        Постов не существует!
      </div>
    )
  }

  return (
    <div className="max-w-[900] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-3/5">
          {posts?.map((post) => {
            return <PostItem key={post._id} post={post} />
          })}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Popular:</div>
          {popularPosts?.map((post) => {
            return <PopularPost key={post._id} post={post} />
          })}
        </div>
      </div>
    </div>
  )
}
