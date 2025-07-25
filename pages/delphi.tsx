import Layout from '@/components/Layout';
import Script from 'next/script';

export default function Delphi() {
  return (
    <Layout
      title="Let us not talk falsely now"
      description="Interactive Delphi mind interface"
      url="/delphi"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Delphi Embed Container */}
          <section className="bg-background-darker rounded-lg p-4">
            <div
              id="delphi-container"
              style={{ width: '100%', height: '800px' }}
            />
          </section>
        </div>
      </div>

      {/* Delphi Scripts */}
      <Script
        id="delphi-page-script"
        dangerouslySetInnerHTML={{
          __html: `
          window.delphi = {...(window.delphi ?? {}) };
          window.delphi.page = {
            config: "2d7d62d0-9cd9-4c2d-ba8a-4b009dc124fc",
            overrides: {
              landingPage: "OVERVIEW",
            },
            container: {
              width: "100%",
              height: "800px",
            },
          };
        `,
        }}
      />

      <Script
        id="delphi-page-bootstrap"
        src="https://embed.delphi.ai/loader.js"
      />
    </Layout>
  );
}
