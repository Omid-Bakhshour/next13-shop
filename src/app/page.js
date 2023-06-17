import CarouselBanner from "@/components/carouselBanner";
import CarouselCategory from "@/components/carouselCategory";

export default async function Home({ params }) {
  return (
    <main className="flex flex-col">
      {/* carousel banner */}

      <CarouselBanner />

      {/* carousel category */}
      <CarouselCategory />
    </main>
  );
}
