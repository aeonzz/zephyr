import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function HomeHero() {
  return (
    <div className="relative h-auto">
      <Image
        src="/sophie-red-image.jpg"
        alt="Luxury Hotel"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex h-full items-center justify-center">
        <div className="container py-24 lg:py-32">
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border border-white/20 bg-white/10 p-1 ps-3 text-sm text-white transition hover:bg-white/20"
              href="#"
            >
              Special Summer Offer - Book Now
              <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-white px-2.5 py-1.5 text-sm font-semibold text-black">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
              Experience Luxury at LuxeStay
            </h1>
          </div>
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-xl text-white/80">
              Indulge in world-class amenities, breathtaking views, and
              unparalleled service. Your perfect getaway awaits at LuxeStay.
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg">Book Now</Button>
            <Button size="lg" variant="outline">
              Explore Rooms
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
