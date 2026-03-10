"use client";

import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";
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

export function AboutMapDialog() {
  const t = useTranslations("aboutGeoJsonAndSuperCluster");
  const tMap = useTranslations("map");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hidden sm:block" size="sm" variant="destructive">
          {t("cta")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("title")}</DialogTitle>
        </DialogHeader>

        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-3">{t("description")}</p>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>{t("clientSideRenderingTitle")}</AlertTitle>
            <AlertDescription>{t("clientSideRenderingText")}</AlertDescription>
          </Alert>

          <Separator className="my-6" />

          <h3 className="font-semibold">{tMap("achitectureFlow")}</h3>

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

          <h3 className="font-semibold">
            {t("whatHappensOnInteraction.title")}
          </h3>

          <ol className="my-2 ml-4 list-decimal">
            <li className="my-2">{t("whatHappensOnInteraction.1")}</li>
            <li className="my-2">{t("whatHappensOnInteraction.2")}</li>
            <li className="my-2">{t("whatHappensOnInteraction.3")}</li>
            <li className="my-2">{t("whatHappensOnInteraction.4")}</li>
            <li className="my-2">{t("whatHappensOnInteraction.5")}.</li>
            <li className="my-2">{t("whatHappensOnInteraction.6")}</li>
          </ol>

          <Separator className="my-6" />

          <h3 className="font-semibold">{t("advantages.title")}:</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">{t("advantages.1")}</li>
            <li className="my-2">{t("advantages.2")}</li>
            <li className="my-2">{t("advantages.3")}</li>
            <li className="my-2">{t("advantages.4")}</li>
            <li className="my-2">{t("advantages.5")}</li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">{t("tradeOffs.title")}</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">{t("tradeOffs.1")}</li>
            <li className="my-2">{t("tradeOffs.2")}</li>
            <li className="my-2">{t("tradeOffs.3")}</li>
            <li className="my-2">{t("tradeOffs.4")}</li>
            <li className="my-2">{t("tradeOffs.5")}</li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">{t("whenThisIsIdeal.title")}</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">{t("whenThisIsIdeal.1")}</li>
            <li className="my-2">{t("whenThisIsIdeal.2")}</li>
            <li className="my-2">{t("whenThisIsIdeal.3")}</li>
            <li className="my-2">{t("whenThisIsIdeal.4")}</li>
          </ul>

          <Separator className="my-6" />

          <h3 className="font-semibold">{t("whenToAvoid.title")}</h3>

          <ul className="my-2 ml-4 list-disc">
            <li className="my-2">{t("whenToAvoid.1")}</li>
            <li className="my-2">{t("whenToAvoid.2")}</li>
            <li className="my-2">{t("whenToAvoid.3")}</li>
            <li className="my-2">{t("whenToAvoid.4")}</li>
          </ul>

          <Alert className="mt-6">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>{t("productionNoteTitle")}</AlertTitle>
            <AlertDescription>{t("productionNoteText")}</AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}
