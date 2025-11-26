import { Card } from "@/components/ui/card";
import React from "react";

type Props = {};

const CreateDriverSection = (props: Props) => {
  return (
    <section className="flex flex-col gap-4 p-4 min-h-full border-2 border-red-900">
      <div className="w-full flex items-center justify-center">
        <span className="font-bold text-primary text-2xl">
          Ajouter un chauffeur
        </span>
      </div>
      <div className="grid grid-cols-2 grid-rows-12 h-full"></div>
    </section>
  );
};

export default CreateDriverSection;
