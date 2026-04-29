import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const postsSlice = createSlice({
  name: 'posts',
  initialState: { posts: [] },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    addPost: {
      reducer(state, action) {
        state.posts.unshift(action.payload)
      },
      prepare({ title, content, author, category }) {
        return {
          payload: {
            id: uuidv4(),
            title,
            content,
            author,
            category,
            likes: 0,
            liked: false,
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    updatePost(state, action) {
      const { id, title, content, author, category } = action.payload
      const post = state.posts.find((p) => p.id === id)
      if (!post) {
        return
      }

      post.title = title
      post.content = content
      post.author = author
      post.category = category
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    },
    likePost(state, action) {
      const post = state.posts.find((p) => p.id === action.payload)
      if (post) {
        if (post.liked) {
          post.likes -= 1
          post.liked = false
        } else {
          post.likes += 1
          post.liked = true
        }
      }
    },
  },
})

export const { setPosts, addPost, updatePost, deletePost, likePost } = postsSlice.actions
export const selectPosts = (state) => state.posts.posts
export const selectPostById = (id) => (state) => state.posts.posts.find((p) => p.id === id)
export default postsSlice.reducer
