"use client";

import { FilesUploadProvider } from "@/features/drivers/components/context/file-upload";
import CreateDriverSection from "@/features/drivers/components/CreateDriverSection";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <FilesUploadProvider>
      <CreateDriverSection />;
    </FilesUploadProvider>
  );
};

export default page;
