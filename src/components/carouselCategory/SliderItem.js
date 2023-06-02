import Image from "next/image";
import React from "react";

function SliderItem({ item }) {
  return (
    <div>
      <div className="p-3.5 bg-white dark:bg-slate-900 block hover:dark:shadow-slate-950 hover:shadow-lg   justify-center rounded-lg ">
        <article className="flex flex-col">
          {/* image */}

          <div className="min-w-[137px] min-h-[120px] md:min-w-[192px] md:min-h-[192px] relative">
            <Image alt={item?.title} width={192} height={192} src={item?.img} />
          </div>

          {/* text and price */}
          <h3 className="sbt  my-3.5 max-w-[192px] line-clamp-2 text-[14px]   text-gray-500 dark:text-white">
            {item?.title}
          </h3>

          <p className="font-bold text-sm">AED 230</p>
        </article>
      </div>
    </div>
  );
}

export default SliderItem;
