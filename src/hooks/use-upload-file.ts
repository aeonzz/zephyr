import * as React from "react";
import { toast } from "sonner";
import type { AnyFileRoute, UploadFilesOptions } from "uploadthing/types";

import { type OurFileRouter } from "@/app/api/uploadthing/core";
import type { UploadedFile } from "../types";
import { uploadFiles } from "@/lib/uploadthing";

interface UseUploadFileOptions<TFileRoute extends AnyFileRoute>
  extends Pick<
    UploadFilesOptions<TFileRoute>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  defaultUploadedFiles?: UploadedFile[];
}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  {
    defaultUploadedFiles = [],
    ...props
  }: UseUploadFileOptions<OurFileRouter[keyof OurFileRouter]> = {}
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<UploadedFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: progress,
            };
          });
        },
      });

      const newUploadedFiles = uploadedFiles ? [...uploadedFiles, ...res] : res;
      setUploadedFiles(newUploadedFiles);
      return newUploadedFiles;
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
      return uploadedFiles;
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  };
}