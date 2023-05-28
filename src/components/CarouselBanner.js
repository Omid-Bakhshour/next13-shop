"use client";

import React, { useRef, useState } from "react";
import { banner_list } from "@/utils/Strings";

import {
  BsChevronLeft as PrevIcon,
  BsChevronRight as NextIcon,
} from "react-icons/bs";
import CarouselItem from "./CarouselItem";

function CarouselBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalBanners = banner_list.length;
  const carouselRef = useRef(null);

  const goToNextBanner = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= totalBanners) {
        return 0;
      } else {
        return nextIndex;
      }
    });
    scrollToNextBanner();
  };

  const goToPrevBanner = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexValue = (prevIndex - 1 + totalBanners) % totalBanners;
      if (prevIndex === 0) {
        return totalBanners - 1;
      } else {
        return prevIndexValue;
      }
    });
    scrollToPrevBanner();
  };

  const scrollToNextBanner = () => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const itemWidth = scrollWidth / totalBanners;

      let nextScrollLeft;
      if (currentIndex + 1 >= totalBanners) {
        nextScrollLeft = 0;
      } else {
        nextScrollLeft = (currentIndex + 1) * itemWidth;
      }
      carouselRef.current.scrollTo({
        left: nextScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrevBanner = () => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const itemWidth = scrollWidth / totalBanners;
      let prevScrollLeft;
      if (currentIndex === 0) {
        // If current index is 0, scroll to the last banner
        prevScrollLeft = (totalBanners - 1) * itemWidth;
      } else {
        prevScrollLeft = (currentIndex - 1) * itemWidth;
      }
      carouselRef.current.scrollTo({
        left: prevScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* carousel */}

      <div className="relative">
        {/* prev && next button */}
        <div
          dir="ltr"
          className="container mx-auto absolute left-0 right-0 z-10 flex justify-between top-0 bottom-0 items-center pointer-events-none  px-2"
        >
          <button className="btn-slider" title="Prev" onClick={goToPrevBanner}>
            <PrevIcon className="button" />
          </button>
          <button className="btn-slider" title="Next" onClick={goToNextBanner}>
            <NextIcon className="button" />
          </button>
        </div>

        {/* carousel items */}
        <div
          ref={carouselRef}
          className="w-full max-w-[2800px] mx-auto carousel  "
        >
          {banner_list.map((item, index) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* progress bar */}

      <div className="grid grid-flow-col gap-5 justify-center ">
        {banner_list?.map((item) => {
          return (
            <progress
              key={item?.id}
              value={30}
              max={100}
              className="progress overflow-hidden bg-gray-500  h-1 rounded-2xl cursor-pointer w-3 lg:w-5"
            />
          );
        })}
      </div>
    </div>
  );
}

export default CarouselBanner;
