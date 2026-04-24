import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Cookie Policy | OCS — Ottri Cleaning Services",
  description:
    "How ottri.net uses cookies and works with third-party services like Resend.",
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-5 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28">
          <PageHeader
            eyebrow="Cookies"
            title="Cookie Policy."
            updated="April 24, 2026"
          />

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-700 md:mt-10 md:text-lg">
            Ottri Cleaning Services (&ldquo;OCS&rdquo;, &ldquo;we&rdquo;) does
            not currently use cookies for tracking, advertising, or analytics on
            ottri.net.
          </p>

          <div className="mt-12 md:mt-16">
            <div className="h-px w-full bg-neutral-200" />
            <div className="divide-y divide-neutral-200">
              <LegalSection number="01" title="What cookies are">
                <p>
                  Cookies are small text files stored on your device when you
                  visit a website. They&rsquo;re used to remember preferences,
                  track activity, or deliver personalized content.
                </p>
              </LegalSection>

              <LegalSection number="02" title="Cookies we use">
                <p>
                  This site uses only essential cookies required for basic site
                  function. They do not track you across other websites and are
                  deleted when you close your browser.
                </p>
              </LegalSection>

              <LegalSection number="03" title="Third-party services">
                <p>
                  When you submit our contact form, your data is processed by{" "}
                  <a
                    href="https://resend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resend
                  </a>{" "}
                  to send email notifications to our team. Resend may set its
                  own cookies as part of that process.
                </p>
              </LegalSection>

              <LegalSection number="04" title="Managing cookies">
                <p>
                  You can disable cookies in your browser settings. Note that
                  some site features may not work correctly with cookies
                  disabled.
                </p>
              </LegalSection>

              <LegalSection number="05" title="Updates">
                <p>
                  We may update this policy if we add new analytics or tracking
                  features in the future. Any changes will be posted here with a
                  new &ldquo;Last updated&rdquo; date.
                </p>
              </LegalSection>

              <LegalSection number="06" title="Contact">
                <p>
                  Ottri Cleaning Services LLC
                  <br />
                  Louisville, KY
                  <br />
                  <a href="mailto:info@ottri.net">info@ottri.net</a> ·
                  502-390-7925
                </p>
              </LegalSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
