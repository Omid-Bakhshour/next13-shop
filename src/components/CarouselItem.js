import React from "react";
import Image from "next/image";
import Link from "next/link";
Link;

function CarouselItem({ item }) {
  return (
    <Link
      href={item?.link}
      className="carousel-item flex-none w-full lg:h-[400px] h-[200px] relative"
    >
      <Image src={item?.img} loading="lazy" fill alt={item?.img} />
    </Link>
  );
}

export default CarouselItem;
