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

type Props = {};

const DriverCardStatus = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  return (
    <Card className="relative bg-secondary p-2 flex gap-0 flex-col border-none   w-1/4">
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

const DriversSection = (props: Props) => {
  const pathname = usePathname();
  return (
    <section className="flex flex-col">
      <span className="text-2xl font-semibold text-primary mb-8">
        Chauffeurs
      </span>
      <div className="flex justify-between gap-4 mb-8">
        <DriverCardStatus title="Non Conforme" value={99} color="bg-red-500" />
        <DriverCardStatus
          title="Indisponible"
          value={50}
          color="bg-[#FF8D28]"
        />
        <DriverCardStatus title="Conforme" value={10} color="bg-[#34C759]" />
        <DriverCardStatus title="Disponible" value={40} color="bg-[#FFCC00]" />
      </div>
      <div>
        <TableDriverContainer />
      </div>
    </section>
  );
};

export default DriversSection;
