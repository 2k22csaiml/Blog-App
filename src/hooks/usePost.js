import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost, likePost, selectPostById } from '../store/postsSlice'
import { useNotification } from '../context/NotificationContext'

export function usePost(id) {
  const post = useSelector(selectPostById(id))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const handleDelete = () => {
    if (!window.confirm('Delete this post?')) {
      return
    }
    dispatch(deletePost(id))
    showNotification('Post deleted')
    navigate('/')
  }

  const handleLike = () => dispatch(likePost(id))

  return { post, handleDelete, handleLike }
}
