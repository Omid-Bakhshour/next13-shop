"use client";
import React, { useEffect, useRef, useState } from "react";
import { banner_list } from "@/utils/Strings";
import {
  BsChevronLeft as PrevIcon,
  BsChevronRight as NextIcon,
} from "react-icons/bs";
import CarouselItem from "./CarouselItem";
import Progress from "./Progress";

function CarouselBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalBanners = banner_list.length;
  const carouselRef = useRef(null);
  const firstRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    const firstDiv = firstRef.current;
    if (firstDiv && window.getComputedStyle(firstDiv).direction === "rtl") {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
  }, []);
  const goToNextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalBanners);
    setProgress(0);

    if (isRtl) {
      scrollToPrevBanner();
    } else {
      scrollToNextBanner();
    }
  };

  const goToPrevBanner = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalBanners) % totalBanners
    );
    setProgress(0);
    if (isRtl) {
      scrollToNextBanner();
    } else {
      scrollToPrevBanner();
    }
  };

  const scrollToNextBanner = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const containerWidth = container.clientWidth;
      let nextScrollLeft;

      if (isRtl) {
        nextScrollLeft =
          currentIndex < totalBanners - 1
            ? container.scrollLeft - containerWidth
            : containerWidth;
      } else {
        nextScrollLeft =
          currentIndex < totalBanners - 1
            ? container.scrollLeft + containerWidth
            : 0;
      }

      showSelectedBanner(container, nextScrollLeft);
    }
  };

  const scrollToPrevBanner = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;
      let prevScrollLeft;

      if (isRtl) {
        prevScrollLeft =
          currentIndex > 0
            ? container.scrollLeft + containerWidth
            : containerWidth - scrollWidth;
      } else {
        prevScrollLeft =
          currentIndex > 0
            ? container.scrollLeft - containerWidth
            : scrollWidth - containerWidth;
      }

      showSelectedBanner(container, prevScrollLeft);
    }
  };

  const scrollToBannerByIndex = (index) => {
    setCurrentIndex(index);
    const container = carouselRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth;
      const itemWidth = scrollWidth / totalBanners;
      const scrollLeft = isRtl
        ? (totalBanners - index) * itemWidth - scrollWidth
        : index * itemWidth;

      showSelectedBanner(container, scrollLeft);
    }
  };

  const showSelectedBanner = (container, value) => {
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

  // change currentindex by touch

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleIndex = Array.from(
            entry.target.parentNode.children
          ).indexOf(entry.target);
          setCurrentIndex(visibleIndex);
          setProgress(0);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    const carouselItems = container.children;
    Array.from(carouselItems).forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, [currentIndex, totalBanners]);

  // infinite automatic go to next banner after 5 seconds

  useEffect(() => {
    if (!isPaused) {
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress == 100) {
            clearInterval(progressInterval);
            setProgress(0);
            if (isRtl) {
              goToPrevBanner();
            } else {
              goToNextBanner();
            }
          }
          return newProgress;
        });
      }, 5 * 10);

      return () => {
        clearInterval(progressInterval);
      };
    }
  }, [isPaused, currentIndex]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section ref={firstRef} className="w-full flex flex-col gap-5">
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* prev && next button */}
        <div className="container ltr:flex-row rtl:flex-row-reverse mx-auto absolute left-0 right-0 z-10 flex justify-between top-0 bottom-0 items-center pointer-events-none  px-2">
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
          className="w-full max-w-[2800px] mx-auto carousel"
        >
          {banner_list.map((item, index) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div className="grid grid-flow-col gap-5 justify-center">
        {banner_list?.map((item, index) => (
          <Progress
            key={item?.id}
            value={currentIndex == index ? progress : "0"}
            active={currentIndex === index}
            scrollTo={() => scrollToBannerByIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default CarouselBanner;
