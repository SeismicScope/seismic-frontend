import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface Hero7Props {
  heading?: string;
  subtitle?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
    className?: string;
  };
  children?: React.ReactNode;
  className?: string;
}

const Hero7 = ({
  heading = "A Collection of Components Built With Shadcn & Tailwind",
  subtitle = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
  children,
  className,
}: Hero7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-semibold lg:text-6xl">{heading}</h1>
          <h2 className="text-lg font-semibold">{subtitle}</h2>
          <p className="text-muted-foreground text-balance lg:text-lg">
            {description}
          </p>
        </div>
        <Button asChild size="lg" className="mt-10">
          <a href={button.url}>{button.text}</a>
        </Button>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          {children}
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
