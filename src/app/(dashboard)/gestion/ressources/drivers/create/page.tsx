"use client";

import { FilesUploadProvider } from "@/features/drivers/components/context/file-upload";
import { LinkCarDriverProvider } from "@/features/drivers/components/context/link-car-driver";
import CreateDriverSection from "@/features/drivers/components/CreateDriverSection";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <FilesUploadProvider>
      <LinkCarDriverProvider>
      <CreateDriverSection />;
      </LinkCarDriverProvider>
    </FilesUploadProvider>
  );
};

export default page;
