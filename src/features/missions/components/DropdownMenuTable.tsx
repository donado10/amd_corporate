"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode, useContext } from "react";
import { FileUploadContext } from "./context/file-upload";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DropdownMenuTable({
  mission,
  children,
}: {
  mission: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuItem className="text-blue-600" onClick={() => { }} asChild>
          <Link
            href={{
              pathname: pathname + "/" + mission,
            }}
          >
            Voir
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
