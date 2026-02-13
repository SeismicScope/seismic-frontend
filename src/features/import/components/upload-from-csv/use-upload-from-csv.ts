import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUploadEarthquakes } from "@/features/import/hooks/use-upload-earthquakes";
import { getErrorMessage } from "@/shared/lib/utils";

import { type UploadFormValues, uploadSchema } from "./schema";

export function useUploadFromCSV() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: upload, isPending } = useUploadEarthquakes();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      secretWord: "",
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  function onSubmit(values: UploadFormValues) {
    if (!selectedFile) {
      toast.error("Please select a CSV file");

      return;
    }

    upload(
      { file: selectedFile, secretWord: values.secretWord },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          toast.success("CSV upload started");
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  }

  return {
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
  };
}
