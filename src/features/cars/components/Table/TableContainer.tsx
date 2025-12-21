"use client";

import React from "react";
import { DataTable } from "./table";

import { Card } from "@/components/ui/card";
import { ICarTableInfo } from "./interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import AddIcon from "@/assets/add.svg";
import { usePathname } from "next/navigation";
import { SelectAvailability } from "../tableFilter";
import useGetCarInfoTable from "../../api/use-get-car-info-table";
import Search from "@/features/missions/components/Search";

const TableCarContainer = () => {
  const pathname = usePathname();

  const { data, isPending } = useGetCarInfoTable();

  return (
    <div className="flex flex-col gap-8">
      <div className=" flex items-center justify-between">
        <div>
          <Search onAction={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          }} placeholder={"Recherche un matricule"} />
        </div>
        <div className="flex items-center gap-2">
          <SelectAvailability onAction={() => { }} />
        </div>
      </div>
      <DataTable
        data={
          !isPending && data.result && data.result.length > 0
            ? (data.result as ICarTableInfo[])
            : []
        }
      />
    </div>
  );
};

export default TableCarContainer;
