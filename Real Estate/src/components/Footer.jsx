import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-xl font-display font-bold text-primary-600 dark:text-primary-400">Elite</span>
              <span className="text-xl font-display font-bold text-stone-800 dark:text-stone-200">Estate</span>
            </Link>
            <p className="text-stone-600 dark:text-stone-400 max-w-md">
              Your trusted partner in finding premium properties. From cozy homes to luxury estates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400">Home</Link></li>
              <li><Link to="/properties" className="text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400">Properties</Link></li>
              <li><Link to="/contact" className="text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-stone-600 dark:text-stone-400">hello@eliteestate.com</p>
            <p className="text-stone-600 dark:text-stone-400">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 text-center text-stone-500 text-sm">
          © {new Date().getFullYear()} Elite Estate. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
