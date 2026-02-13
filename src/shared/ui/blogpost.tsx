// this is default shadcn/blocks blogpost1
import { Lightbulb } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

import { Separator } from "./separator";

interface Blogpost1Props {
  className?: string;
}

function Blogpost({ className }: Blogpost1Props) {
  return (
    <section className={cn("p-3 lg:p-16", className)}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <h1 className="max-w-3xl text-3xl font-semibold text-pretty md:text-6xl lg:text-5xl">
          Seismic Intelligence Platform
        </h1>
        <h3 className="text-muted-foreground max-w-3xl text-lg md:text-xl">
          Is an analytical system designed to process and visualize a massive
          dataset of earthquake events (~800,000 records).
        </h3>
      </div>
      <div className="mt-4">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <h4 className="text-xl font-extrabold">
            The project serves as a demonstration of high-performance
            engineering, specifically focusing on:
          </h4>
          <ul className="my-3 ml-4 list-disc">
            <li className="my-2">
              <span className="font-semibold">Big Data Management:</span>{" "}
              Handling and processing large-scale datasets efficiently.
            </li>
            <li className="my-2">
              <span className="font-semibold">Spatial Querying:</span>{" "}
              Implementing complex geographical queries.
            </li>
            <li className="my-2">
              <span className="font-semibold">Database Optimization:</span>{" "}
              Advanced indexing and performance tuning
            </li>
            <li className="my-2">
              <span className="font-semibold">
                Server-side Pagination & Filtering:
              </span>{" "}
              Ensuring fast response times for deep-data retrieval.
            </li>
            <li className="my-2">
              <span className="font-semibold">
                Frontend Virtualized Rendering:
              </span>{" "}
              Rendering thousands of data points without UI lag.
            </li>
            <li className="my-2">
              <span className="font-semibold">Performance Scaling:</span>{" "}
              Implementation of caching and background tasks.
            </li>
            <li className="my-2">
              <span className="font-semibold">Security:</span> Minimal
              Role-Based Access Control (RBAC).
            </li>
          </ul>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Not a CRUD application</AlertTitle>
            <AlertDescription>
              This project is not a standard CRUD application. Its primary goal
              is to showcase architectural and engineering solutions applied to
              a complex, real-world dataset.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="mt-6">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <h4 className="text-xl font-extrabold">General Architecture</h4>
          <p>
            The system is built with a modern, scalable stack designed to handle
            high-frequency data operations and complex spatial analysis.
          </p>
          <p className="mt-4 font-bold">Tech Stack</p>
          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">
              <span className="font-semibold">Frontend:</span> Next.js 16 (App
              Router)
            </li>
            <li className="my-2">
              <span className="font-semibold">Backend:</span> NestJS (Node.js
              Framework)
            </li>
            <li className="my-2">
              <span className="font-semibold">Database:</span> PostgreSQL with
              PostGIS extension (for spatial data)
            </li>
            <li className="my-2">
              <span className="font-semibold">ORM:</span> Prisma
            </li>
            <li className="my-2">
              <span className="font-semibold">Cache & Message Broker:</span>{" "}
              Redis
            </li>
            <li className="my-2">
              <span className="font-semibold">Task Scheduling:</span> BullMQ
              (Background jobs)
            </li>
            <li className="my-2">
              <span className="font-semibold">Visualization:</span> Mapbox GL JS
              (Mapping) & Recharts (Analytics)
            </li>
          </ul>
          <Separator className="my-4" />
          <p className="font-bold">Interaction Workflow</p>
          <ol className="my-2 ml-4 list-decimal">
            <li className="my-2">
              <span className="font-semibold">Frontend:</span> Communicates with
              NestJS API via REST.
            </li>
            <li className="my-2">
              <span className="font-semibold">NestJS:</span> Manages business
              logic and queries PostgreSQL.
            </li>
            <li className="my-2">
              <span className="font-semibold">Redis:</span> Acts as a high-speed
              layer for caching and managing the job queue.
            </li>
            <li className="my-2">
              <span className="font-semibold">Background Worker:</span>{" "}
              Processes heavy data tasks via BullMQ to keep the main API
              responsive.
            </li>
          </ol>
          <Separator className="my-4" />
          <p className="font-bold">Infrastructure & Deployment</p>
          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">
              <span className="font-semibold">Frontend Hosting:</span> Vercel
            </li>
            <li className="my-2">
              <span className="font-semibold">Backend Hosting:</span>{" "}
              DigitalOcean Droplet
            </li>
            <li className="my-2">
              <span className="font-semibold">CI/CD Pipeline:</span> GitHub
              Actions
            </li>
            <li className="my-2">
              <span className="font-semibold">Containerization:</span> Docker
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <Separator className="my-6" />

          <h4 className="text-xl font-extrabold">About the Author</h4>

          <p>
            This project was designed and developed by{" "}
            <span className="font-semibold">Vasyl Oliinyk</span> as a
            demonstration of full-stack engineering expertise, focusing on
            high-performance data systems, spatial analytics, and scalable
            architecture.
          </p>

          <p>
            The goal of this platform is not just feature implementation, but
            architectural clarity, performance optimization, and
            production-grade engineering practices.
          </p>

          <ul className="my-4 ml-4 list-disc">
            <li>
              <span className="font-semibold">LinkedIn:</span>{" "}
              <a
                href="https://www.linkedin.com/in/oleinik-vasiliiy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all hover:opacity-60"
              >
                Vasyl Oliinyk
              </a>
            </li>
            <li>
              <span className="font-semibold">Project Storybook:</span>{" "}
              <a
                href="https://seismicscope.github.io/seismic-frontend/storybook/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all hover:opacity-60"
              >
                UI Component Library
              </a>
            </li>
            <li>
              <span className="font-semibold">Backend Repository:</span>{" "}
              <a
                href="https://github.com/SeismicScope/seismic-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all hover:opacity-60"
              >
                NestJS API Source Code
              </a>
            </li>
          </ul>

          <Alert className="mt-4">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Engineering Focus</AlertTitle>
            <AlertDescription>
              The emphasis of this project is on system design, performance
              scaling, data-heavy architecture, and production-level code
              quality — not just UI development.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
}

export default Blogpost;
