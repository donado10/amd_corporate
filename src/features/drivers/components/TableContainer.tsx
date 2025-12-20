"use client";

import React from "react";
import { DataTable } from "./Table/table";

import { IDriveTableInfo } from "./Table/interface";
import { SelectAvailability, SelectContractType } from "./tableFilter";
import useGetDriverInfoTable from "../api/use-get-driver-info-table";
import { Input } from "@/components/ui/input";


const TableDriverContainer = () => {

  const { data, isPending } = useGetDriverInfoTable();

  return (
    <div className="flex flex-col gap-8">
      <div className=" flex items-center justify-between">
        <div>
          <span className="border  h-10  flex items-center justify-center p-2 rounded-2xl "><Input placeholder="Rechercher chauffeur" className="h-8 border-none shadow-none" /></span>
        </div>
        <div className="flex items-center gap-2">
          <SelectAvailability onAction={() => { }} />
          <SelectContractType />
        </div>
      </div>
      <DataTable
        data={
          !isPending && data?.result && data.result.length > 0
            ? (data.result as IDriveTableInfo[])
            : []
        }
      />
    </div>
  );
};

export default TableDriverContainer;
