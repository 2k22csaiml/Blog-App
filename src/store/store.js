import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import { loadPosts, savePosts } from '../utils/storage'

const defaultPosts = [
  {
    id: 'seed-1',
    title: 'Welcome to the Blog Post App',
    content:
      'This is a sample post. You can create new posts, edit them, delete them, and like them. Data is stored locally in your browser.',
    author: 'Admin',
    category: 'General',
    likes: 0,
    liked: false,
    createdAt: new Date().toISOString(),
  },
]

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  preloadedState: {
    posts: {
      posts: loadPosts(defaultPosts),
    },
  },
})

store.subscribe(() => {
  const posts = store.getState().posts.posts
  savePosts(posts)
})
