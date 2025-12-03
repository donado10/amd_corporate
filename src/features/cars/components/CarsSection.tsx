"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AddIcon from "@/assets/add.svg";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TableCarContainer from "@/features/cars/components/Table/TableContainer";

const CarCardStatus = ({
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

const CarsSection = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col">
      <span className="text-2xl font-semibold text-primary mb-8">
        Véhicules
      </span>
      <div className="flex justify-between gap-4 mb-8">
        <CarCardStatus title="Non Conforme" value={99} color="bg-red-600" />
        <CarCardStatus title="Indisponible" value={50} color="bg-[#FF8D28]" />
        <CarCardStatus title="Disponible" value={40} color="bg-green-600" />
      </div>
      <div>
        <TableCarContainer />
      </div>
    </section>
  );
};

export default CarsSection;
