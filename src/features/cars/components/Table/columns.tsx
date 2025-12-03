import { ColumnDef } from "@tanstack/react-table";

import { ICarTableInfo } from "./interface";
import { cn, MStatus } from "@/lib/utils";
import DotsIcon from "@/assets/dots.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenuTable } from "../DropdownMenuTable";

const StatusDisplay = ({ value }: { value: string }) => {
  const MStatusDisplay = new Map<string, string>([
    ["disponible", "bg-green-600"],
    ["non_conforme", "bg-red-600"],
    ["indisponible", "bg-[#FF8D28]"],
  ]);

  return (
    <>
      <div
        className={cn(
          "capitalize rounded-4xl w-fit text-white font-semibold   py-2 px-3",
          MStatusDisplay.get(value)
        )}
      >
        {MStatus.get(value)}
      </div>
    </>
  );
};

export const columns: ColumnDef<ICarTableInfo>[] = [
  {
    accessorKey: "car_matricule",
    header: "Matricule",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("car_matricule")}</div>
    ),
  },
  {
    accessorKey: "car_modele",
    header: "Modele",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("car_modele")}</div>
    ),
  },
  {
    accessorKey: "car_fullname",
    header: "Chauffeur assigné",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("car_fullname")}</div>
    ),
  },
  {
    accessorKey: "car_mileage",
    header: "Kilométrage",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("car_mileage")} KM</div>
    ),
  },
  {
    accessorKey: "car_status",
    header: "Status",
    cell: ({ row }) => (
      <>
        <StatusDisplay value={row.getValue("car_status")} />
      </>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenuTable driver={row.original.car_no}>
        <Button variant={"ghost"} type="button">
          <Image src={DotsIcon} alt="" width={16} height={16} />{" "}
        </Button>
      </DropdownMenuTable>
    ),
  },
];
