"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import AddIcon from "@/assets/add.svg";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TableMissionContainer from "./Table/TableContainer";


const MissionCardStatus = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  return (
    <Card className="relative bg-secondary p-2 flex gap-0 flex-col border-none   w-1/3">
      <span
        className={cn("rounded-full w-6 h-6 absolute  top-2 right-2  ", color)}
      ></span>
      <CardTitle className="mb-4">{title}</CardTitle>
      <CardContent className=" p-0">
        <span className="font-bold text-primary text-xl">{value}</span>
      </CardContent>
    </Card>
  );
};


const MissionSection = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col">
      <span className="text-2xl font-semibold text-primary mb-8">Missions</span>

      <div className="flex justify-between gap-4 mb-8">
        <MissionCardStatus title="ECHOUEES" value={99} color="bg-red-600" />
        <MissionCardStatus
          title="EN COURS"
          value={50}
          color="bg-[#FF8D28]"
        />
        <MissionCardStatus title="TERMINEES" value={40} color="bg-green-600" />
        <MissionCardStatus title="CREER" value={40} color="bg-[#FFCC00]" />
      </div>
      <div>
        <TableMissionContainer />
      </div>
    </section>
  );
};

export default MissionSection;
