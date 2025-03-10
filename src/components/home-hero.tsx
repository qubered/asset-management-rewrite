import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Database, Laptop, Lightbulb, Speaker } from "lucide-react";

interface Integration {
  id: string;
  icon: React.ReactNode;
}

interface Hero32Props {
  heading?: string;
  description?: string;
  button?: {
    text: React.ReactNode | string;
    url: string;
  };
  integrations?: Integration[][];
}

const Hero32 = ({
  heading = "Blocks Built With Shadcn & Tailwind",
  description = "Fully decomposable components, all the images and background patterns are individual images or svgs that can be replaced.",
  button = {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
  integrations = [
    [
      {
        id: "integration-1",
        icon: (
            <Database className="w-10 h-10 text-muted-foreground"></Database>
        ),
      },
      {
        id: "integration-2",
        icon: (
            <Lightbulb className="w-10 h-10 text-muted-foreground"></Lightbulb>
        ),
      },
      {
        id: "integration-3",
        icon: (
            <Database className="w-10 h-10 text-muted-foreground"></Database>
        ),
      },
      {
        id: "integration-4",
        icon: (
            <Laptop className="w-10 h-10 text-muted-foreground"></Laptop>
        ),
      },
      {
        id: "integration-5",
        icon: (
            <Speaker className="w-10 h-10 text-muted-foreground"></Speaker>
        ),
      },
    ],
    [
      {
        id: "integration-6",
        icon: (
            <Speaker className="w-10 h-10 text-muted-foreground"></Speaker>
        ),
      },
      {
        id: "integration-7",
        icon: (
            <Laptop className="w-10 h-10 text-muted-foreground"></Laptop>
        ),
      },
      {
        id: "integration-8",
        icon: (
            <Lightbulb className="w-10 h-10 text-muted-foreground"></Lightbulb>
        ),
      },
      {
        id: "integration-9",
        icon: (
            <Speaker className="w-10 h-10 text-muted-foreground"></Speaker>
        ),
      },
      {
        id: "integration-10",
        icon: (
            <Database className="w-10 h-10 text-muted-foreground"></Database>
        ),
      },
    ],
    [
      {
        id: "integration-11",
        icon: (
            <Lightbulb className="w-10 h-10 text-muted-foreground"></Lightbulb>
        ),
      },
      {
        id: "integration-12",
        icon: (
            <Speaker className="w-10 h-10 text-muted-foreground"></Speaker>
        ),
      },
      {
        id: "integration-13",
        icon: (
            <Lightbulb className="w-10 h-10 text-muted-foreground"></Lightbulb>
        ),
      },
      {
        id: "integration-14",
        icon: (
            <Database className="w-10 h-10 text-muted-foreground"></Database>
        ),
      },
      {
        id: "integration-15",
        icon: (
            <Laptop className="w-10 h-10 text-muted-foreground"></Laptop>
        ),
      },
    ],
  ],
}: Hero32Props) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1400 600"
          className="min-h-full min-w-full"
        >
          <defs>
            <pattern
              id="grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="1"
                strokeOpacity={0.5}
              />
            </pattern>
          </defs>
          <rect width="1400" height="600" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute left-0 z-10 hidden h-full w-1/2 bg-[linear-gradient(to_right,var(--color-background)_85%,transparent_100%)] md:block"></div>
        <div className="md:-space-x-26 container relative flex flex-col items-start md:flex-row md:items-center">
          <div className="bg-background z-20 -mx-[calc(theme(container.padding))] w-[calc(100%+2*theme(container.padding))] shrink-0 px-[calc(theme(container.padding))] pt-32 md:w-1/2 md:bg-transparent md:pb-32">
            <div className="flex flex-col items-start text-left">
              <div className="max-w-sm">
                <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                  {heading}
                </h1>
                <p className="text-muted-foreground">{description}</p>
                <Button asChild size="lg" className="mt-10">
                  <Link href={button.url}>{button.text}</Link>
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-16 pb-8 pt-12 md:py-32">
              {integrations.map((line, i) => (
                <div key={i} className="flex gap-x-24 odd:-translate-x-24">
                  {line.map((integration) => (
                    <div
                      key={integration.id}
                      className="border-background bg-background size-24 rounded-xl border shadow-xl"
                    >
                      <div className="bg-muted/20 h-full w-full p-4 flex items-center justify-center">
                        {integration.icon}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero32 };
