import AppShell from "@/components/layouts/app-shell";
import HomeHero from "./_components/home-hero";

export default function Home() {
  return (
    <div className="relative">
      <AppShell>
        <HomeHero />
      </AppShell>
    </div>
  );
}
