import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost, selectPosts } from '../store/postsSlice'
import { useNotification } from '../context/NotificationContext'
import { useMemo, useState } from 'react'
import { formatDate } from '../utils/formatDate'

function BlogHomePage() {
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()
  const { showNotification } = useNotification()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(posts.map((post) => post.category || 'General')))
    return ['All', ...uniqueCategories]
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return posts
    }
    return posts.filter((post) => (post.category || 'General') === selectedCategory)
  }, [posts, selectedCategory])

  const onDelete = (id) => {
    if (!window.confirm('Delete this post?')) {
      return
    }
    dispatch(deletePost(id))
    showNotification('Post deleted')
  }

  return (
    <main className="max-w-[720px] mx-auto px-6 pt-32 pb-20">
      <header className="mb-stack-lg">
        <h1 className="font-display text-display text-primary mb-stack-sm">Current Stream</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px]">Curated collection of blog posts on design, technology, and ideas.</p>
      </header>

      {categories.length > 1 && (
        <div className="mb-stack-md flex items-center gap-4">
          <label htmlFor="category-filter" className="font-label-sm text-label-sm uppercase tracking-widest">Filter:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="px-4 py-2 border border-outline-variant rounded text-on-surface"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {!filteredPosts.length && (
        <p className="text-center text-on-surface-variant py-12">No posts available for this category.</p>
      )}

      <div className="space-y-stack-md">
        {filteredPosts.map((post) => (
          <article className="p-8 bg-white border border-outline-variant rounded-lg group transition-all duration-300" key={post.id}>
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                {formatDate(post.createdAt)} • {post.category || 'General'}
              </span>
            </div>
            <Link to={`/posts/${post.id}`} className="no-underline">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm leading-tight group-hover:text-primary/80 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              {post.content.length > 150 ? `${post.content.slice(0, 150)}...` : post.content}
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-surface-container">
              <div className="flex items-center gap-6">
                <button className={`flex items-center gap-2 transition-colors ${
                  post.liked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                }`} type="button" onClick={() => dispatch(likePost(post.id))}>
                  <span className="material-symbols-outlined">{post.liked ? 'favorite' : 'favorite'}</span>
                  <span className="font-label-sm text-label-sm">{post.likes}</span>
                </button>
                <Link className="font-label-sm text-label-sm uppercase tracking-widest border-b border-transparent hover:border-primary transition-all" to={`/posts/${post.id}`}>View Details</Link>
              </div>
              <div className="flex items-center gap-3">
                <Link className="font-label-sm text-label-sm uppercase tracking-widest text-primary hover:opacity-80" to={`/posts/${post.id}/edit`}>Edit</Link>
                <button className="font-label-sm text-label-sm uppercase tracking-widest text-error hover:opacity-80" type="button" onClick={() => onDelete(post.id)}>Delete</button>
              </div>
              <span className="font-label-sm text-label-sm text-outline italic">by {post.author}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default BlogHomePage
