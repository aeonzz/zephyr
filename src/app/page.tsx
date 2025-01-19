import AppShell from "@/components/layouts/app-shell";
import HomeHero from "./_components/home-hero";
import Collections from "./_components/collections";

export default function Home() {
  return (
    <main className="relative">
      <AppShell>
        <HomeHero />
        <Collections />
      </AppShell>
    </main>
  );
}
