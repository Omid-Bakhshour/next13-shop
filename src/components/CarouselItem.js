import React from "react";
import Image from "next/image";

function CarouselItem({ item }) {
  return (
    <div
      className={`carousel-item flex-none w-full lg:h-[400px] h-[200px] relative`}
    >
      <Image src={item?.img} loading="lazy" fill />
    </div>
  );
}

export default CarouselItem;
