import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 mt-stack-lg">
      <div className="max-w-[720px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs uppercase tracking-widest text-neutral-800">© 2024 BlogStack</p>
        <div className="flex gap-8">
          <Link to="/" className="font-sans text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer">Privacy</Link>
          <Link to="/" className="font-sans text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer">Terms</Link>
          <Link to="/" className="font-sans text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer">RSS</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
