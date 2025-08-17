import Layout from '@/components/Layout';
import Image from 'next/image';

export default function About() {
  return (
    <Layout title="About" url="/about">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <section className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              If Esoteric had a garden.
            </h1>
          </section>

          {/* Vintage Image */}
          <section className="w-full flex justify-center py-4">
            <Image
              src="/images/men_wanted_vintage.jpg"
              alt="Vintage newspaper clipping reading 'MEN WANTED for hazardous journey, small wages, bitter cold, long months of complete darkness, constant danger, safe return doubtful, honor and recognition in case of success'"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </section>

          {/* Content */}
          <section className="prose prose-nord max-w-none">
            <div className="space-y-6 text-text-primary leading-relaxed">
              <p>
                You&apos;ll find reflections on everything from programming to
                diet and fitness. From religious contemplation, to practical
                life philosophy, and poetry. The most interesting insights often
                emerge from the cross-pollination of different ideas.
              </p>

              <h2>Principles</h2>
              <ul>
                <li>Clarity beats cleverness.</li>
                <li>
                  Empathy with boundaries. Have dignity for others, and respect
                  for yourself.
                </li>
                <li>Explore, then manufacture.</li>
                <li>Agency over passivity.</li>
                <li>Love your craft.</li>
              </ul>
            </div>
          </section>

          {/* Currently Listening */}
          <section className="bg-background-darker rounded-lg p-6">
            <div className="w-full">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/track/2KmoTSrMgQDI8UIffLTmvj?si=af642c93dbcd442d"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </section>

          {/* Contact */}
          <section className="bg-background-darker rounded-lg p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Get in Touch
            </h2>
            <div className="space-y-2 text-text-secondary">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:faris@duck.com"
                  className="text-links hover:text-primary transition-colors"
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
