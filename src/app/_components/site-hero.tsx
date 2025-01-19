import { Button } from "@/components/ui/button";
import React from "react";
import * as motion from "motion/react-client";

const fadeInUp = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function SiteHero() {
  return (
    <section className="relative flex h-auto items-center justify-center border-b">
      <motion.div
        className="container py-10"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.div className="mt-5 max-w-2xl" variants={fadeInUp}>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to Zephyr
          </h1>
        </motion.div>
        <motion.div className="mt-5 max-w-3xl" variants={fadeInUp}>
          <p className="text-xl text-muted-foreground">
            Discover the coziest, trendiest hoodies designed for comfort and
            style. Find your perfect fit today!
          </p>
        </motion.div>
        <motion.div className="mt-8 flex gap-3" variants={fadeInUp}>
          <Button size="lg">Shop Now</Button>
          <Button size="lg" variant="outline">
            Browse Collections
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
