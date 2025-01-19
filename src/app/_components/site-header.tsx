import React from "react";
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
import { ShoppingBag, Shirt, Tag, Truck, Star, Phone } from "lucide-react";
import { LoginFallback, LoginWrapper } from "@/components/login-wrapper";
import { ThemeToggle } from "@/components/theme-toggle";

const hoodieCollections = [
  {
    title: "New Arrivals",
    href: "/new-arrivals",
    description:
      "Check out the latest and trendiest hoodies in our collection.",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    title: "Classic Hoodies",
    href: "/classic",
    description: "Browse our timeless classic hoodie designs.",
    icon: <Shirt className="h-4 w-4" />,
  },
  {
    title: "Discounts",
    href: "/discounts",
    description: "Grab amazing deals on select hoodies.",
    icon: <Tag className="h-4 w-4" />,
  },
  {
    title: "Shipping Info",
    href: "/shipping",
    description: "Learn about our shipping policies and delivery options.",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    title: "Best Sellers",
    href: "/best-sellers",
    description: "Discover the most popular hoodies loved by our customers.",
    icon: <Star className="h-4 w-4" />,
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Reach out to our support team for any questions.",
    icon: <Phone className="h-4 w-4" />,
  },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Zephyr</span>
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Shop Hoodies</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/about"
                        >
                          <ShoppingBag className="h-6 w-6 text-primary" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Zephyr
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore the finest collection of hoodies for every
                            style and season.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/about-us" title="About Us">
                      Learn more about our passion for stylish hoodies.
                    </ListItem>
                    <ListItem href="/gallery" title="Gallery">
                      Take a peek at our exclusive hoodie designs.
                    </ListItem>
                    <ListItem href="/reviews" title="Customer Reviews">
                      See what our customers have to say about our hoodies.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {hoodieCollections.map((collection) => (
                      <ListItem
                        key={collection.title}
                        title={collection.title}
                        href={collection.href}
                        icon={collection.icon}
                      >
                        {collection.description}
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
          <ThemeToggle />
          <React.Suspense fallback={<LoginFallback />}>
            <LoginWrapper />
          </React.Suspense>
        </div>
      </nav>
    </header>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-300 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
