"use client";

import React from "react";
import { DataTable } from "./Table/table";

import { Card } from "@/components/ui/card";
import { IDriveTableInfo, IPayment } from "./Table/interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import AddIcon from "@/assets/add.svg";
import { usePathname } from "next/navigation";
import { SelectAvailability, SelectContractType } from "./tableFilter";
import useGetDriverInfoTable from "../api/use-get-driver-info-table";

const data: IPayment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

const TableDriverContainer = () => {
  const pathname = usePathname();

  const { data, isPending } = useGetDriverInfoTable();

  console.log(data);

  return (
    <div className="flex flex-col gap-8">
      <div className=" flex items-center justify-between">
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
        <div className="flex items-center gap-2">
          <SelectAvailability onAction={() => {}} />
          <SelectContractType />
        </div>
      </div>
      <DataTable
        data={
          !isPending && data.result && data.result.length > 0
            ? (data.result as IDriveTableInfo[])
            : []
        }
      />
    </div>
  );
};

export default TableDriverContainer;
