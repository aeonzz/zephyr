import { Button } from "@/components/ui/button";
import React from "react";

export default function HomeHero() {
  return (
    <div className="relative h-auto">
      <div className="relative flex h-full items-center justify-center">
        <div className="container py-24 lg:py-32">
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Experience Luxury at LuxeStay
            </h1>
          </div>
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-xl text-muted-foreground">
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
