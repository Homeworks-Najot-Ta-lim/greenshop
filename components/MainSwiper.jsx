"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo"
import SlideThree from "./SlideThree"



const slides= [
  {
    id: 1,
    image: "/image1.png",
    title: "Slide 1",
    width: 225,
    height: 225,
  },
  {
    id: 2,
    image: "/image2.png",
    title: "Slide 2",
    width: 240,
    height: 210,
  },

];

export default function HeroSwiper() {
  return (
    <div className="w-full h-[500px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 100000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
       

        <SwiperSlide className="mx-auto my-4">
          <SlideOne />
        </SwiperSlide>
        <SwiperSlide>
          <SlideTwo/>
        </SwiperSlide>
        <SwiperSlide>
          <SlideThree/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}