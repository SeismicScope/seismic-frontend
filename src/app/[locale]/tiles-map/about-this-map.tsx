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

function AboutVectorTiles() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hidden sm:block" size="sm" variant="destructive">
          About Vector Tiles architecture
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Map Architecture (PostGIS → MVT → Mapbox)
          </DialogTitle>
        </DialogHeader>

        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-3">
            This implementation uses{" "}
            <strong>server-generated Mapbox Vector Tiles (MVT)</strong>, where
            geometry clipping and data preparation are performed inside
            PostgreSQL using PostGIS.
          </p>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Server-side spatial processing</AlertTitle>
            <AlertDescription>
              PostGIS generates vector tiles using ST_AsMVT and ST_AsMVTGeom.
              The frontend renders only binary tile data.
            </AlertDescription>
          </Alert>

          <Separator className="my-6" />

          <h3 className="font-semibold">Architecture Flow</h3>

          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
            {`PostgreSQL (PostGIS)
        ↓
ST_TileEnvelope(z, x, y)
        ↓
Spatial Index (GIST)
        ↓
ST_AsMVTGeom()
        ↓
ST_AsMVT()
        ↓
Binary .mvt tile
        ↓
Mapbox GL Rendering`}
          </pre>

          <Separator className="my-6" />

          <h3 className="font-semibold">What Happens On Interaction:</h3>

          <ol className="my-2 ml-4 list-decimal">
            <li className="my-2">User moves the map.</li>
            <li className="my-2">
              Mapbox automatically requests tiles (z/x/y).
            </li>
            <li className="my-2">Backend generates vector tile in PostGIS.</li>
            <li className="my-2">Binary MVT tile is returned.</li>
            <li className="my-2">
              Mapbox renders geometry directly from GPU buffers.
            </li>
          </ol>

          <Separator className="my-6" />

          <h3 className="font-semibold">Advantages:</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">
              <strong>Small network payload</strong> (binary tiles)
            </li>
            <li className="my-2">
              <strong>No large JSON transfers</strong>
            </li>
            <li className="my-2">
              <strong>GPU-optimized rendering</strong>
            </li>
            <li className="my-2">
              <strong>Scales to millions of points</strong>
            </li>
            <li className="my-2">
              <strong>Backend-level spatial control</strong>
            </li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">Trade-offs:</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">More complex SQL queries</li>
            <li className="my-2">Harder debugging (binary format)</li>
            <li className="my-2">Increased backend CPU load</li>
            <li className="my-2">
              Requires proper spatial indexing (3857 recommended)
            </li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">When This Architecture Is Ideal:</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">
              Hundreds of thousands to millions of points
            </li>
            <li className="my-2">Production geo platforms</li>
            <li className="my-2">Low-bandwidth environments</li>
            <li className="my-2">High concurrency systems</li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">Performance Characteristics:</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">Rendering depends on visible tiles only</li>
            <li className="my-2">No client-side clustering required</li>
            <li className="my-2">
              Backend performance tied to spatial index quality
            </li>
          </ul>

          <Alert className="mt-6">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Production Standard</AlertTitle>
            <AlertDescription>
              This is the architecture used by large-scale geo platforms such as
              map providers, logistics systems, and spatial analytics tools.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AboutVectorTiles;
