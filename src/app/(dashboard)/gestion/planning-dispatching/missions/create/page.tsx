"use client";

import { FilesUploadProvider } from "@/features/missions/components/context/file-upload";
import CreateMissionSection from "@/features/missions/components/CreateMissionSection";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <FilesUploadProvider>
      <CreateMissionSection />;
    </FilesUploadProvider>
  );
};

export default page;
