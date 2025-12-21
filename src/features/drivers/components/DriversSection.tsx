"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TableDriverContainer from "./TableContainer";
import { DropdownHeaderMenuSection } from "../../../components/DropdownHeaderMenuSection";
import useGetStatDriver from "../api/use-get-stats";
import { CardStatus } from "@/components/CardStatus";




const DriverCardStatusContainer = () => {
  const { data, isPending } = useGetStatDriver()

  if (isPending) {
    return <></>
  }

  if (!data) {
    return <></>
  }


  return <div className="flex justify-between gap-4 mb-8">
    <CardStatus title="Non Conforme" value={data.result.non_conforme} color="bg-red-600" />
    <CardStatus
      title="Indisponible"
      value={data.result.indisponible}
      color="bg-[#FF8D28]"
    />
    <CardStatus title="Disponible" value={data.result.disponible} color="bg-green-600" />
  </div>
}

const DriversSection = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between mb-8">

        <span className="  text-2xl font-semibold text-primary ">
          Chauffeurs
        </span>

        <div>
          <DropdownHeaderMenuSection items={[{ label: "Ajouter un chauffeur", link: pathname + '/create' }]} />
        </div>
      </div>
      <DriverCardStatusContainer />
      <div>
        <TableDriverContainer />
      </div>
    </section>
  );
};

export default DriversSection;
