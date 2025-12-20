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
import AddIcon from "@/assets/add.svg";


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

const DriversSection = (props: Props) => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between mb-8">

        <span className="  text-2xl font-semibold text-primary ">
          Chauffeurs
        </span>

        <div>

          <Button
            className=" border-2 border-primary hover:bg-primary hover:text-white flex items-center justify-between"
            variant={"outline"}
            asChild
          >
            <Link href={pathname + "/create"} className="w-fit">
              <span>
                <Image
                  src={AddIcon}
                  alt=""
                  width={24}
                  height={24}
                  className=""
                />
              </span>
              <span>Ajouter un chauffeur</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-between gap-4 mb-8">
        <DriverCardStatus title="Non Conforme" value={99} color="bg-red-600" />
        <DriverCardStatus
          title="Indisponible"
          value={50}
          color="bg-[#FF8D28]"
        />
        <DriverCardStatus title="Disponible" value={40} color="bg-green-600" />
      </div>
      <div>
        <TableDriverContainer />
      </div>
    </section>
  );
};

export default DriversSection;
