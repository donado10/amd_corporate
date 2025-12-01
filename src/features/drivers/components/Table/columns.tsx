import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDriveTableInfo } from "./interface";

export const columns: ColumnDef<IDriveTableInfo>[] = [
  {
    accessorKey: "em_fullname",
    header: "Nom Complet",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("em_fullname")}</div>
    ),
  },
  {
    accessorKey: "em_matricule",
    header: "Matricule",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("em_matricule")}</div>
    ),
  },
  {
    accessorKey: "em_car",
    header: "Véhicule assigné",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("em_car")}</div>
    ),
  },
  {
    accessorKey: "em_lastmission",
    header: "Dernière Mission",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("em_lastmission")}</div>
    ),
  },
  {
    accessorKey: "em_status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize rounded-4xl w-fit text-white font-semibold  bg-red-600 py-2 px-3">
        {row.getValue("em_status")}
      </div>
    ),
  },
];
