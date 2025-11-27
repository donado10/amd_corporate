"use client";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import FileImportLogo from "@/assets/import_files.svg";

const FilesUploadExemple = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };
  return (
    <Dropzone
      maxFiles={3}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};
export const FilesUpload = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };
  return (
    <Button
      type="button"
      variant={"outline"}
      asChild
      className="flex items-center justify-between flex-row p-2 w-fit gap-4"
    >
      <Dropzone
        maxFiles={3}
        onDrop={handleDrop}
        onError={console.error}
        src={files}
        className="p-2 px-4"
      >
        <div>
          <Image src={FileImportLogo} alt="" />
        </div>
        <span className="text-primary font-semibold">
          Téléverser un document
        </span>
      </Dropzone>
    </Button>
  );
};
export default FilesUpload;
