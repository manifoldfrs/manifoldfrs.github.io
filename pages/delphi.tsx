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
            config: "18963e6d-89ff-42cc-868f-119f05893fb9",
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
        src="https://embed.delphi.build/loader.js"
      />
    </Layout>
  );
}
