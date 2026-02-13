export type ImportStatus = {
  fileName: string;
  id: number;
  processed: number;
  status: string;
  updatedAt: string;
};

export type UploadParams = {
  file: File;
  secretWord: string;
};
