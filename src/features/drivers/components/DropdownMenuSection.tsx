import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useContext } from "react";

export function DropdownMenuSection({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem
                    className="text-blue-600"
                    onClick={() => {
                    }}
                >
                    <Link href={pathname + "/create"} className="w-fit">

                        Ajouter un chauffeur
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
