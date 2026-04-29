import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost, selectPostById } from '../store/postsSlice'
import { useNotification } from '../context/NotificationContext'
import { formatDate } from '../utils/formatDate'

function BlogPostPage() {
  const { id } = useParams()
  const post = useSelector(selectPostById(id))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  if (!post) {
    return <p>Post not found.</p>
  }

  const onDelete = () => {
    if (!window.confirm('Delete this post?')) {
      return
    }

    dispatch(deletePost(id))
    showNotification('Post deleted')
    navigate('/')
  }

  return (
    <>
      <div className="reading-progress bg-primary"></div>
      <main className="max-w-[720px] mx-auto px-6 py-stack-lg">
        <header className="mb-stack-md">
          <div className="flex justify-between items-start mb-stack-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface">{post.author}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">
                  {formatDate(post.createdAt)} • 8 min read
                </p>
              </div>
            </div>
            <div className="flex gap-base">
              <Link
                to={`/posts/${id}/edit`}
                className="px-6 py-3 border border-outline-variant rounded-lg font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit
              </Link>
              <button
                onClick={onDelete}
                className="px-6 py-3 border border-error/20 rounded-lg font-label-sm text-label-sm text-error hover:bg-error-container/20 transition-colors flex items-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Delete
              </button>
            </div>
          </div>
          <h1 className="font-display text-display mb-stack-sm text-on-background">{post.title}</h1>
          <div className="flex gap-2 mb-stack-md">
            <span className="px-2 py-1 border border-outline-variant rounded font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">
              {post.category || 'General'}
            </span>
          </div>
        </header>

        <article className="font-body-lg text-body-lg text-on-surface leading-relaxed space-y-stack-sm">
          <p>{post.content}</p>
        </article>

        <section className="mt-stack-lg pt-stack-md border-t border-outline-variant">
          <div className="bg-surface-container-low p-stack-md rounded-lg flex flex-col md:flex-row gap-gutter items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border border-outline-variant">
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                {post.author.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-headline-md text-headline-md text-on-background mb-2">{post.author}</h4>
              <p className="font-body-md text-on-surface-variant mb-4">
                {post.author} is a thoughtful writer sharing insights on design, technology, and ideas.
              </p>
              <button className="font-label-sm text-label-sm text-primary uppercase tracking-widest border-b border-primary pb-1 hover:opacity-70 transition-opacity" type="button">
                Follow {post.author}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-stack-lg text-center py-stack-md border-t border-outline-variant">
          <div className="flex items-center justify-center gap-6 pt-6">
            <button
              onClick={() => dispatch(likePost(id))}
              className={`flex items-center gap-2 transition-colors ${
                post.liked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined">favorite</span>
              <span className="font-label-sm text-label-sm">{post.likes}</span>
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default BlogPostPage
