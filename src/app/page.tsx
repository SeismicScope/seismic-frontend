import { Hero7 } from "@/shared/ui/hero7";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-80px)] items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero7
        heading="SeismicScope Platform"
        subtitle="High-performance earthquake analytics system (800k+ records)"
        description=""
        button={{
          text: "Discover earthquakes!",
          url: "/dashboard",
        }}
      />
    </main>
  );
}
