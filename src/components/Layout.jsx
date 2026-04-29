import Navbar from './Navbar'
import Footer from './Footer'
import { useNotification } from '../context/NotificationContext'

function Layout({ children }) {
  const { notification } = useNotification()

  return (
    <>
      <Navbar />

      {notification && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded text-sm font-medium z-40 ${
          notification.type === 'success'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}

      <main className="pt-20">{children}</main>

      <Footer />
    </>
  )
}

export default Layout
