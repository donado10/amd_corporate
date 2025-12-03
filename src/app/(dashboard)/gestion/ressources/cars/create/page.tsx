import CreateCarSection from "@/features/cars/components/CreateCarSection";
import { FilesUploadProvider } from "@/features/cars/components/context/file-upload";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <FilesUploadProvider>
      <CreateCarSection />
    </FilesUploadProvider>
  );
};

export default page;
