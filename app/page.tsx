import { JsonLd } from "@/components/JsonLd";
import { howToSchema } from "@/lib/schema";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyOCS } from "@/components/WhyOCS";
import { Testimonials } from "@/components/Testimonials";
import { Sponsors } from "@/components/Sponsors";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <JsonLd data={howToSchema()} />
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <WhyOCS />
      <Testimonials />
      <Sponsors />
      <Contact />
      <Footer />
    </>
  );
}
