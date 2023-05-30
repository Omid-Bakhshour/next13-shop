"use client";

import { slider_list } from "@/utils/Strings";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowRight as RightIcon } from "react-icons/bs";
import SliderItem from "./SliderItem";

import {
  BsChevronLeft as PrevIcon,
  BsChevronRight as NextIcon,
} from "react-icons/bs";

function CarouselCategory() {
  const [items, setItems] = useState(slider_list);
  const carouselRef = useRef(null);
  const firstRef = useRef(null);
  const [isRtl, setIsRtl] = useState(false);
  useEffect(() => {
    const firstDiv = firstRef.current;
    if (firstDiv && window.getComputedStyle(firstDiv).direction === "rtl") {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
  }, []);

  const goToPrevious = () => {
    const container = carouselRef.current;
    const containerWidth = container.clientWidth;
    const scroll = container.scrollLeft - containerWidth;
    const scrollWidth = container.scrollWidth;

    if (isRtl) {
      if (Math.round(Math.abs(scroll)) == scrollWidth) {
        console.log("get more");
      } else {
        carouselNavigation(container, scroll);
      }
    } else {
      carouselNavigation(container, scroll);
    }
  };

  const goToNext = () => {
    const container = carouselRef.current;
    const containerWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    const scroll = container.scrollLeft + containerWidth;

    if (isRtl) {
      carouselNavigation(container, scroll);
    } else {
      if (Math.round(scroll) == scrollWidth) {
        console.log("get more");
      } else {
        carouselNavigation(container, scroll);
      }
    }
  };

  const carouselNavigation = (container, value) => {
    if (container) {
      if (container.scrollTo) {
        if (container.scrollLeft !== value) {
          container.scrollTo({
            left: value,
            behavior: "smooth",
          });
        }
      } else {
        container.scrollLeft = value;
      }
    }
  };

  return (
    <section
      ref={firstRef}
      dir="ltr"
      className="w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] flex flex-col mx-auto px-[22px] lg:px-0 mt-5 md:mb-3 md:gap-2 "
    >
      {/* title and check all button */}

      <div className="flex justify-between items-center">
        <div className="md:w-[87px] md:block hidden" />
        <h3 className="font-bold text-[24px] md:text-center text-start  ">
          New Arrival
        </h3>

        <Link
          className="text-xs  space-x-2 flex gap-2 items-center  "
          href="/new/?ordering=-id"
        >
          <span>Check All</span>
          <RightIcon
            className={`w-5 h-5 block mb-1 ${isRtl ? "rotate-180" : ""} `}
          />
        </Link>
      </div>

      {/* items */}

      <div className="relative">
        {/* prev && next button */}
        <div className="container ltr:flex-row  rtl:flex-row-reverse mx-auto absolute left-0 right-0 z-10 flex justify-between top-0 bottom-0 items-center pointer-events-none  px-2">
          <button
            className="btn-slider bg-white shadow-lg"
            title="Prev"
            onClick={goToPrevious}
          >
            <PrevIcon className="button text-black " />
          </button>
          <button
            className="btn-slider bg-white shadow-lg"
            title="Next"
            onClick={goToNext}
          >
            <NextIcon className="button  text-black " />
          </button>
        </div>

        {/* carousel */}
        <div
          ref={carouselRef}
          className="carousel  mb-0 lg:mb-0 grid grid-flow-col gap-x-[20px] md:gap-x-[30px] max-w-full justify-start px-2 py-5"
        >
          {items?.map((item) => (
            <SliderItem key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CarouselCategory;
