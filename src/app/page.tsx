import AppShell from "@/components/layouts/app-shell";
import SiteHero from "./_components/site-hero";
import Collections from "./_components/collections";

export default function Home() {
  return (
    <main className="relative">
      <AppShell>
        <SiteHero />
        <Collections />
      </AppShell>
    </main>
  );
}
