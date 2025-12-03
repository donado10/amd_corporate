"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AddIcon from "@/assets/add.svg";

type Props = {};

const CarsSection = (props: Props) => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col">
      <span className="text-2xl font-semibold text-primary mb-8">
        Véhicules
      </span>
      <div>
        <Button
          className=" border-2 border-primary hover:bg-primary hover:text-white flex items-center justify-between"
          variant={"outline"}
          asChild
        >
          <Link href={pathname + "/create"} className="w-fit">
            <span>
              <Image src={AddIcon} alt="" width={24} height={24} className="" />
            </span>
            <span>Ajouter un véhicule</span>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CarsSection;
