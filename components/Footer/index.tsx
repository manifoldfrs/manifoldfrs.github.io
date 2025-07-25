import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/manifoldfrs', icon: 'github' },
  { name: 'X (Twitter)', href: 'https://x.com/frshbb', icon: 'twitter' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/farishabib', icon: 'linkedin' },
  { name: 'Substack', href: 'https://frshbb.substack.com', icon: 'substack' }
];

const SocialIcon = ({ icon }: { icon: string }) => {
  const iconPaths = {
    github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    substack: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z',
    delphi: 'M2 7h8c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H7v2h5v2H7c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h3V9H2V7zm10 0h8v2h-5v2h5v2h-5v2h5v2h-8c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2z'
  };

  // Special handling for Delphi logo
  if (icon === 'delphi') {
    return (
      <img
        src='/images/delphi_logo1.jpeg'
        alt='Delphi'
        className='w-5 h-5 rounded'
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <svg
      className='w-5 h-5'
      fill='currentColor'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <path d={iconPaths[icon as keyof typeof iconPaths]} />
    </svg>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-background-dark border-t border-nord-3 mt-auto'>
      <div className='container py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          {/* Site Info */}
          <div className='text-center md:text-left'>
            <p className='text-text-secondary text-sm'>© {currentYear} Faris Habib.</p>
          </div>

          {/* Social Links */}
          <div className='flex space-x-4'>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-text-secondary hover:text-primary transition-colors'
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* RSS Feed Link */}
        <div className='mt-4 pt-4 border-t border-nord-3 text-center'>
          <Link
            href='/feed.xml'
            className='text-text-secondary hover:text-primary text-sm transition-colors'
          >
            RSS Feed
          </Link>
        </div>
      </div>
    </footer>
  );
}
