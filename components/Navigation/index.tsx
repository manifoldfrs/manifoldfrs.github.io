import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Categories', href: '/categories' },
  { name: 'Archive', href: '/archive' },
  // { name: 'Portfolio', href: '/portfolio' }, // Commented out as in original
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="nav-link text-sm font-medium"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="nav-link p-2"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background-darker rounded-lg shadow-lg md:hidden z-50">
          <div className="py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-sm nav-link hover:bg-nord-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}