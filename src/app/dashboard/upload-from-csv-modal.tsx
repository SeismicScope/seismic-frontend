import React from "react";

import { useUploadEarthquakes } from "@/features/import/hooks/use-upload-earthquakes";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

function UploadFromCSVModal() {
  const { mutate: upload, isPending } = useUploadEarthquakes();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file) {
      upload(file);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload data from CSV</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload data from CSV </DialogTitle>
          <div className="bg-card flex flex-col gap-4 rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Import Earthquakes</h3>
            <p className="text-muted-foreground text-sm">
              Upload a CSV file with earthquake data
            </p>

            <div className="flex items-center gap-4">
              <input
                type="file"
                id="csv-upload"
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isPending}
              />
              <Button asChild disabled={isPending}>
                <label htmlFor="csv-upload">
                  {isPending ? "Uploading..." : "Select CSV File"}
                </label>
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UploadFromCSVModal;
