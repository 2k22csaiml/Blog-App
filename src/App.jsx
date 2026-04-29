import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import BlogHomePage from './pages/BlogHomePage'
import BlogPostPage from './pages/BlogPostPage'
import BlogEditorPage from './pages/BlogEditorPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BlogHomePage />} />
        <Route path="/posts/new" element={<BlogEditorPage />} />
        <Route path="/posts/:id" element={<BlogPostPage />} />
        <Route path="/posts/:id/edit" element={<BlogEditorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
