"use client";

// this is deatult shadcn/block hero7
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  FADE_IN,
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionP,
  SLIDE_UP,
  SLIDE_UP_SM,
  staggerDelay,
} from "@/shared/ui/motion";

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

function Hero7({
  heading = "",
  subtitle = "",
  description = "",
  button,
  children,
  className,
}: Hero7Props) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <MotionH1
            className="text-3xl font-semibold lg:text-6xl"
            {...SLIDE_UP}
            transition={{ ...SLIDE_UP.transition, ...staggerDelay(0) }}
          >
            {heading}
          </MotionH1>
          <MotionH2
            className="text-lg font-semibold"
            {...SLIDE_UP}
            transition={{ ...SLIDE_UP.transition, ...staggerDelay(1) }}
          >
            {subtitle}
          </MotionH2>
          {!!description && (
            <MotionP
              className="text-muted-foreground text-balance lg:text-lg"
              {...SLIDE_UP_SM}
              transition={{ ...SLIDE_UP_SM.transition, ...staggerDelay(2) }}
            >
              {description}
            </MotionP>
          )}
        </div>
        {!!button && (
          <MotionDiv
            {...FADE_IN}
            transition={{ ...FADE_IN.transition, ...staggerDelay(3) }}
            className="mt-10 inline-block"
          >
            <Button asChild size="lg">
              <a href={button.url}>{button.text}</a>
            </Button>
          </MotionDiv>
        )}
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          {children}
        </div>
      </div>
    </section>
  );
}

export { Hero7 };
