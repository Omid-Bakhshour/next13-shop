import CarouselBanner from "@/components/carouselBanner";
import CarouselCategory from "@/components/carouselCategory";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* carousel banner */}

      <CarouselBanner />

      {/* carousel category */}
      <CarouselCategory />
    </main>
  );
}
