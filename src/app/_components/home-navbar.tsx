import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Hotel, Utensils, Car, Plane, Map, Phone } from "lucide-react";
import { LoginFallback, LoginWrapper } from "@/components/login-wrapper";

const hotelServices: {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Room Types",
    href: "/rooms",
    description:
      "Explore our variety of room types, from cozy singles to luxurious suites.",
    icon: <Hotel className="h-4 w-4" />,
  },
  {
    title: "Dining",
    href: "/dining",
    description:
      "Discover our restaurants and bars offering exquisite culinary experiences.",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    title: "Transportation",
    href: "/transportation",
    description:
      "Learn about our airport shuttle service and car rental options.",
    icon: <Car className="h-4 w-4" />,
  },
  {
    title: "Attractions",
    href: "/attractions",
    description:
      "Find out about nearby attractions and activities for your stay.",
    icon: <Map className="h-4 w-4" />,
  },
  {
    title: "Flights",
    href: "/flights",
    description:
      "Book your flights along with your hotel stay for a seamless travel experience.",
    icon: <Plane className="h-4 w-4" />,
  },
  {
    title: "Contact",
    href: "/contact",
    description:
      "Get in touch with our customer service for any queries or special requests.",
    icon: <Phone className="h-4 w-4" />,
  },
];

export default function HomeNavbar() {
  return (
    <nav className="container sticky top-0 z-50 flex items-center justify-between bg-white py-3">
      <div className="flex items-center gap-6">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Hotel className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">LuxeStay</span>
          </div>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Our Hotel</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/about"
                      >
                        <Hotel className="h-6 w-6 text-primary" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          LuxeStay Hotel
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Experience luxury and comfort in the heart of the
                          city. Our hotel offers top-notch amenities and
                          exceptional service for an unforgettable stay.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/amenities" title="Amenities">
                    Discover our world-class facilities and services.
                  </ListItem>
                  <ListItem href="/gallery" title="Gallery">
                    Take a visual tour of our stunning hotel and rooms.
                  </ListItem>
                  <ListItem href="/reviews" title="Guest Reviews">
                    Read what our guests have to say about their stay.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {hotelServices.map((service) => (
                    <ListItem
                      key={service.title}
                      title={service.title}
                      href={service.href}
                      icon={service.icon}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/special-offers" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Special Offers
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">Book Now</Button>
        <React.Suspense fallback={<LoginFallback />}>
          <LoginWrapper />
        </React.Suspense>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
