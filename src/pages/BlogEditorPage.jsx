import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { addPost, selectPostById, updatePost } from '../store/postsSlice'
import { useNotification } from '../context/NotificationContext'

const MIN_CONTENT_WORDS = 30

function BlogEditorPage() {
  const { id } = useParams()
  const editing = Boolean(id)
  const existingPost = useSelector(editing ? selectPostById(id) : () => null)

  const [title, setTitle] = useState(existingPost?.title ?? '')
  const [author, setAuthor] = useState(existingPost?.author ?? '')
  const [category, setCategory] = useState(existingPost?.category ?? 'General')
  const [content, setContent] = useState(existingPost?.content ?? '')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  if (editing && !existingPost) {
    return <p>Post not found.</p>
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const trimmedContent = content.trim()
    const contentWordCount = trimmedContent.split(/\s+/).filter(Boolean).length

    if (!title.trim() || !author.trim() || !category.trim() || !trimmedContent) {
      showNotification('All fields are required', 'error')
      return
    }

    if (!editing && contentWordCount < MIN_CONTENT_WORDS) {
      showNotification(`Content is too short. Write at least ${MIN_CONTENT_WORDS} words.`, 'error')
      return
    }

    if (editing) {
      dispatch(
        updatePost({
          id,
          title,
          author,
          category,
          content,
        }),
      )

      showNotification('Post updated')
      navigate(`/posts/${id}`)
      return
    }

    const action = dispatch(addPost({ title, author, category, content }))
    showNotification('Post created')
    navigate(`/posts/${action.payload.id}`)
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[2px] bg-neutral-200 z-[100]">
        <div className="h-full bg-primary w-[30%]"></div>
      </div>

      <main className="max-w-[720px] mx-auto px-6 pt-stack-lg pb-section-padding min-h-[calc(100vh-200px)]">
        <form className="space-y-stack-md" onSubmit={onSubmit}>
          <div className="space-y-stack-sm">
            <span className="font-label-sm text-label-sm text-outline uppercase">{editing ? 'Edit Post' : 'New Draft'}</span>
            <input
              autoFocus
              className="w-full bg-transparent border-0 border-b border-neutral-200 focus:border-primary focus:ring-0 px-0 py-4 font-headline-lg text-headline-lg transition-colors outline-none"
              placeholder="Enter post title..."
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="pt-stack-sm space-y-stack-sm">
            <label className="font-label-sm text-label-sm text-outline uppercase block">Author</label>
            <input
              className="w-full bg-transparent border-0 border-b border-neutral-200 focus:border-primary focus:ring-0 px-0 py-3 font-body-lg text-body-lg transition-colors outline-none"
              placeholder="Your name..."
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>

          <div className="pt-stack-sm space-y-stack-sm">
            <label className="font-label-sm text-label-sm text-outline uppercase block">Category</label>
            <input
              className="w-full bg-transparent border-0 border-b border-neutral-200 focus:border-primary focus:ring-0 px-0 py-3 font-body-lg text-body-lg transition-colors outline-none"
              placeholder="e.g. Tech, Design, Travel"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </div>

          <div className="pt-stack-sm">
            <textarea
              className="w-full min-h-[400px] bg-transparent border-0 focus:ring-0 px-0 font-body-lg text-body-lg leading-relaxed transition-colors outline-none resize-none"
              placeholder="Tell your story..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          <div className="flex items-center justify-between pt-stack-md border-t border-neutral-100">
            <div className="flex gap-4">
              <button
                className="px-6 py-3 font-label-sm text-label-sm bg-primary text-white rounded hover:opacity-90 transition-opacity flex items-center gap-2"
                type="submit"
              >
                <span>{editing ? 'Update Post' : 'Save Post'}</span>
              </button>
              <Link
                to="/"
                className="px-6 py-3 font-label-sm text-label-sm border border-neutral-200 text-neutral-600 rounded hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>


      </main>
    </>
  )
}

export default BlogEditorPage
