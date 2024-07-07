'use client'
import Image from 'next/image'
import React, { useEffect, useState, useRef } from "react";

export default function CarouselHome() {
  const images: string[] = [
    '/carousel/cs1.webp',
    '/carousel/cs2.webp',
    '/carousel/cs3.webp',
    '/carousel/cs4.webp',
    '/carousel/cs5.webp',
    '/carousel/cs6.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, images.length]);

  useEffect(() => {
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
      carouselContainer.scrollTo({
        left: carouselContainer.clientWidth * currentIndex,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className='relative w-full mt-[20px]'>
      <div id="carousel-container" className='flex w-full snap-x snap-mandatory space-x-4 overflow-x-auto'>
        {images.map((src, i) => (
          <Image key={i} src={src} width={3000} height={1000} alt='' className='snap-center w-full' />
        ))}
      </div>
      <button onClick={goToPrevious} className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full p-2'>
        &lt;
      </button>
      <button onClick={goToNext} className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full p-2'>
        &gt;
      </button>
    </div>
  );
}
