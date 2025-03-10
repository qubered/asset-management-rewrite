"use client"
import { ModeToggle } from "@/components/themes/theme-button"
import { Hero32 } from "@/components/home-hero";
import { Feature43 } from "@/components/home-featured";
import FeatureReasons from "./feature-reasons";
import { Separator } from "@/components/ui/separator";
export default function HomePage() {
  return (
    <main className="">
      <div className="flex fixed top-4 right-4 z-50 gap-4">
        <ModeToggle />
      </div>
      <Hero32 heading="Asset Management" description="Theatre focused asset management system" button={{
        text: (
          "Dashboard"
        ), url: "/main"
      }} />
      <Separator className="my-10" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <Feature43 heading="Why Us?" reasons={FeatureReasons()} />
      </div>
    </main>
  );
}
