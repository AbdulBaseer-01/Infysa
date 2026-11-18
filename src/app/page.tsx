import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Services from "@/components/Services";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import WhyInfysa from "@/components/WhyInfysa";
import FAQs from "@/components/FAQs";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div>
      <Hero
        count={24}
        lines={["Make your brand", "impossible to ignore."]}
        brand="Infysa"
        tagline="We combine digital marketing, creative strategy and high-performing websites to help ambitious businesses grow."
        images={[
          "https://picsum.photos/seed/orbit-01/2160/3840",
          "https://picsum.photos/seed/orbit-02/3840/2160",
          "https://picsum.photos/seed/orbit-03/2160/3840",
          "https://picsum.photos/seed/orbit-04/3840/2160",
          "https://picsum.photos/seed/orbit-05/2160/3840",
          "https://picsum.photos/seed/orbit-06/3840/2160",
          "https://picsum.photos/seed/orbit-07/2160/3840",
          "https://picsum.photos/seed/orbit-08/3840/2160",
          "https://picsum.photos/seed/orbit-09/2160/3840",
          "https://picsum.photos/seed/orbit-10/3840/2160",
          "https://picsum.photos/seed/orbit-11/2160/3840",
          "https://picsum.photos/seed/orbit-12/3840/2160",
          "https://picsum.photos/seed/orbit-13/2160/3840",
          "https://picsum.photos/seed/orbit-14/3840/2160",
          "https://picsum.photos/seed/orbit-15/2160/3840",
          "https://picsum.photos/seed/orbit-16/3840/2160",
          "https://picsum.photos/seed/orbit-17/2160/3840",
          "https://picsum.photos/seed/orbit-18/3840/2160",
          "https://picsum.photos/seed/orbit-19/2160/3840",
          "https://picsum.photos/seed/orbit-20/3840/2160",
        ]}
      />
      <Introduction />
      <Services />
      <SelectedWork />
      <Process />
      <WhyInfysa />
      <FAQs />
      <FinalCTA />
      <Footer />
    </div>
  );
}
