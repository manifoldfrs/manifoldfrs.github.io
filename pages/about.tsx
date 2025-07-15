import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout
      title='About'
      description='Learn more about Faris Habib'
      url='/about'
    >
      <div className='max-w-3xl mx-auto'>
        <div className='space-y-8'>
          {/* Header */}
          <section className='text-center'>
            <h1 className='text-3xl md:text-4xl font-bold text-text-primary mb-4'>About</h1>
          </section>

          {/* Content */}
          <section className='prose prose-nord max-w-none'>
            <div className='space-y-6 text-text-primary leading-relaxed'>
              <p>
                <em>If Esoteric had a garden.</em>
              </p>

              <p>I&apos;m Faris, an autodidact exploring the intersections of technology, philosophy, and the human condition. This blog serves as my digital commonplace book, where I cultivate ideas across diverse domains.</p>

              <p>You&apos;ll find reflections on everything from software development and machine learning to diet and fitness, from religious contemplation to practical life philosophy and poetry. The garden metaphor isn&apos;t just aesthetic—it reflects my belief that the most interesting insights often emerge from the cross-pollination of seemingly unrelated fields.</p>

              <p>Currently wandering the world as a digital nomad, I&apos;m always open to thoughtful conversation and collaboration.</p>
            </div>
          </section>

          {/* Contact */}
          <section className='bg-background-darker rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-text-primary mb-4'>Get in Touch</h2>
            <div className='space-y-2 text-text-secondary'>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href='mailto:faris@duck.com'
                  className='text-links hover:text-primary transition-colors'
                >
                  faris@duck.com
                </a>
              </p>
              <p>
                <strong>Location:</strong> San Francisco, CA
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
