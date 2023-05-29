import React from "react";
import Image from "next/image";
import Link from "next/link";
Link;

function CarouselItem({ item }) {
  return (
    <div
      href={item?.link}
      className="carousel-item flex-none w-full lg:h-[400px] h-[200px] relative"
    >
      <span className="w-full flex items-center justify-center bg-black text-white">
        {item?.id}
      </span>
      {/* <Image src={item?.img} loading="lazy" fill alt={item?.img} /> */}
    </div>
  );
}

export default CarouselItem;
