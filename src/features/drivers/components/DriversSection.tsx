"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToastSuccess } from "@/components/ToastComponents";
import { toast } from "sonner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TableDriverContainer from "./TableContainer";
import { DropdownMenuSection } from "./DropdownMenuSection";
import useGetStatDriver from "../api/use-get-stats";


const CardStatus = ({
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

const DriverCardStatusContainer = () => {
  const { data, isPending } = useGetStatDriver()

  if (isPending) {
    return <></>
  }

  if (!data) {
    return <></>
  }


  return <div className="flex justify-between gap-4 mb-8">
    <CardStatus title="Non Conforme" value={data.result.non_conforme} color="bg-red-600" />
    <CardStatus
      title="Indisponible"
      value={data.result.indisponible}
      color="bg-[#FF8D28]"
    />
    <CardStatus title="Disponible" value={data.result.disponible} color="bg-green-600" />
  </div>
}

const DriversSection = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between mb-8">

        <span className="  text-2xl font-semibold text-primary ">
          Chauffeurs
        </span>

        <div>
          <DropdownMenuSection items={[{ label: "Ajouter un chauffeur", link: pathname + '/create' }]} />
        </div>
      </div>
      <DriverCardStatusContainer />
      <div>
        <TableDriverContainer />
      </div>
    </section>
  );
};

export default DriversSection;
