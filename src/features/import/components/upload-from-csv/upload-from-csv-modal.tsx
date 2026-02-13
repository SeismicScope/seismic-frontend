"use client";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useUploadFromCSV } from "./use-upload-from-csv";

function UploadFromCSVModal() {
  const {
    open,
    setOpen,
    selectedFile,
    fileInputRef,
    register,
    handleSubmit,
    errors,
    isPending,
    handleFileChange,
    onSubmit,
  } = useUploadFromCSV();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload data from CSV</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload data from CSV</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Upload a CSV file with earthquake data
          </p>

          <div className="flex flex-col gap-2">
            <Label htmlFor="csv-upload">CSV File</Label>
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                id="csv-upload"
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isPending}
              />
              <Button type="button" variant="outline" asChild>
                <label htmlFor="csv-upload" className="cursor-pointer">
                  {selectedFile ? selectedFile.name : "Select CSV File"}
                </label>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="secretWord">Secret Word</Label>
            <Input
              id="secretWord"
              type="password"
              placeholder="Enter secret word"
              {...register("secretWord")}
              aria-invalid={!!errors.secretWord}
            />
            {errors.secretWord && (
              <p className="text-destructive text-sm">
                {errors.secretWord.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending || !selectedFile}>
            {isPending ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadFromCSVModal;
