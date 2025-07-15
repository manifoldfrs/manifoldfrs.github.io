import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Header() {
  return (
    <header className="bg-background-dark border-b border-nord-3">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Site Title */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-text-primary hover:text-primary transition-colors">
              Faris
            </Link>
          </div>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  )
}