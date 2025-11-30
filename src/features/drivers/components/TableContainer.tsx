"use client";

import React from "react";
import { DataTable } from "./Table/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import AddIcon from "@/assets/add.svg";
import { Card } from "@/components/ui/card";

type Props = {};

const TableDriverContainer = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8">
      <Button
        className=" border-2 border-primary hover:bg-primary hover:text-white flex items-center justify-between"
        variant={"outline"}
        asChild
      >
        <Link href={pathname + "/create"} className="w-fit">
          <span>
            <Image src={AddIcon} alt="" width={24} height={24} className="" />
          </span>
          <span>Ajouter un chauffeur</span>
        </Link>
      </Button>
      <Card className="bg-secondary border-none p-6 ">
        <DataTable />
      </Card>
    </div>
  );
};

export default TableDriverContainer;
