"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/add.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const DriversSection = (props: Props) => {
  const pathname = usePathname();
  return (
    <section>
      <span className="text-2xl font-semibold text-primary">Chauffeurs</span>
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
    </section>
  );
};

export default DriversSection;
