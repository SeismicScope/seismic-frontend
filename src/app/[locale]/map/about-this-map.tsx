"use client";

import { Lightbulb } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Separator } from "@/shared/ui/separator";

function AboutThisMap() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hidden sm:block" size="sm" variant="destructive">
          About GeoJSON + Supercluster architecture
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Map Architecture (GeoJSON + Supercluster)
          </DialogTitle>
        </DialogHeader>

        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-3">
            This implementation uses a client-driven spatial rendering strategy
            based on <strong>GeoJSON payloads</strong> combined with{" "}
            <strong>Supercluster</strong> running inside a Web Worker.
          </p>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Client-side clustering</AlertTitle>
            <AlertDescription>
              All clustering logic runs in the browser. The backend only returns
              raw spatial data filtered by bounding box.
            </AlertDescription>
          </Alert>

          <Separator className="my-6" />

          <h3 className="font-semibold">Architecture Flow</h3>

          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
            {`PostgreSQL (PostGIS)
        ↓
Bounding Box SQL (ST_Intersects)
        ↓
GeoJSON Response
        ↓
Web Worker
        ↓
Supercluster Index
        ↓
Mapbox GL Rendering`}
          </pre>

          <Separator className="my-6" />

          <h3 className="font-semibold">What Happens On Interaction:</h3>

          <ol className="my-2 ml-4 list-decimal">
            <li className="my-2">User moves the map.</li>
            <li className="my-2">Frontend sends bounding box + zoom to API.</li>
            <li className="my-2">
              Backend queries PostGIS using spatial index.
            </li>
            <li className="my-2">GeoJSON payload is returned.</li>
            <li className="my-2">Web Worker builds cluster index.</li>
            <li className="my-2">Mapbox renders clusters or points.</li>
          </ol>

          <Separator className="my-6" />

          <h3 className="font-semibold">Advantages:</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">
              <strong>High FPS rendering</strong> (GPU accelerated via Mapbox)
            </li>
            <li className="my-2">
              <strong>Full clustering control</strong> on frontend
            </li>
            <li className="my-2">
              <strong>Easy debugging</strong> (plain JSON payloads)
            </li>
            <li className="my-2">
              <strong>Low backend CPU cost</strong>
            </li>
            <li className="my-2">
              <strong>Fast local rebuilds</strong> of cluster index
            </li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">Trade-offs:</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">
              Large GeoJSON payloads (can reach several MB)
            </li>
            <li className="my-2">Increased RAM usage in browser</li>
            <li className="my-2">Client CPU usage during cluster rebuild</li>
            <li className="my-2">Hard to scale beyond ~100k visible points</li>
            <li className="my-2">Mobile devices may struggle</li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">When This Architecture Is Ideal</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">Medium datasets (10k–150k visible points)</li>
            <li className="my-2">Analytical dashboards</li>
            <li className="my-2">Exploratory data tools</li>
            <li className="my-2">
              Projects requiring interactive clustering logic
            </li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">When To Avoid It</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">Million+ visible points</li>
            <li className="my-2">Low-powered devices</li>
            <li className="my-2">Strict network bandwidth limits</li>
            <li>Real-time streaming at high frequency</li>
          </ul>

          <Alert className="mt-6">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Production Note</AlertTitle>
            <AlertDescription>
              For massive datasets, a Vector Tile (MVT) server-side architecture
              is more scalable, moving clustering and geometry clipping to
              PostGIS.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AboutThisMap;
