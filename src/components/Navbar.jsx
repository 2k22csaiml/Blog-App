import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-200">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tighter text-neutral-900 cursor-pointer hover:opacity-80">
            BlogStack
          </Link>
          <div className="hidden md:flex items-center gap-6 font-sans tracking-tight text-sm font-medium">
            <Link to="/" className="text-neutral-900 border-b-2 border-neutral-900 pb-1 cursor-pointer transition-colors">Feed</Link>

          </div>
        </div>
        <div className="flex items-center">
          <Link
            to="/posts/new"
            className="bg-primary text-on-primary px-4 py-2 text-label-sm font-label-sm rounded uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            New Post
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
