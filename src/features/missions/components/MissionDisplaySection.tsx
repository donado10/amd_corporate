"use client";

import React, { ReactNode } from "react";
import { missionDocumentSchema, missionSchema } from "../schema";
import z from "zod";
import LeftArrowIcon from "@/assets/left_arrow.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import FileIcon from "@/assets/file.svg";
import DownloadIcon from "@/assets/download.svg";
import { Button } from "@/components/ui/button";
import { StatusDisplay } from "./Table/columns";
import { cn, formatDate } from "@/lib/utils";
import TagIcon from "@/assets/tag.svg"
import { SheetAffectationMission } from "./SheetAffectationMission";

const CardFileMission = ({
  document,
}: {
  document: z.infer<typeof missionDocumentSchema>;
}) => {
  const url = process.env.NEXT_PUBLIC_APP_URL!
  return (
    <Button
      className="bg-[#D9D9D9] w-full h-12 flex items-center justify-between "
      onClick={async () => {
        await fetch(
          `${url}/api/missions/file/${document.file as string}`
        );
      }}
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full p-2 bg-white">
          <Image src={FileIcon} alt="" width={12} height={12} />
        </span>
        <span className="text-black">{document.nom}</span>
      </div>
      <div>
        <span className="rounded-full p-2 ">
          <Image src={DownloadIcon} alt="" width={24} height={24} />
        </span>
      </div>
    </Button>
  );
};

const CardFieldMission = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 border-b-2 pb-1 border-black w-full">
      <span className="font-semibold text-xs">{label}</span>
      <span className="text-sm text-black/50">{value}</span>
    </div>
  );
};

const CardInfoMission = ({
  title,
  left,
  right,
}: {
  title: string;
  left?: { label: string; value: string }[];
  right?: { label: string; value: string }[];
}) => {
  return (
    <Card className="bg-secondary p-4 h-full">
      <CardTitle className="font-semibold">{title}</CardTitle>
      <CardContent className="flex gap-6 p-0 w-full ">
        <div className="flex flex-col gap-4  w-1/2">
          {left?.map((l) => {
            return (
              <CardFieldMission key={l.label} label={l.label} value={l.value} />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          {right?.map((l) => {
            return (
              <CardFieldMission key={l.label} label={l.label} value={l.value} />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const MissionCardStatus = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  return (
    <Card className="relative bg-secondary p-2 flex gap-0 flex-col border-none   w-1/3">
      <span
        className={cn("rounded-full w-6 h-6 absolute  top-2 right-2  ", color)}
      ></span>
      <CardTitle className="mb-4">{title}</CardTitle>
      <CardContent className=" p-0">
        <span className="font-bold text-primary text-xl">{value}</span>
      </CardContent>
    </Card>
  );
};

const MissionDisplaySection = ({
  mission,
}: {
  mission: z.infer<typeof missionSchema>;
}) => {
  const pathname = usePathname();
  return (
    <section className="flex flex-col p-8 gap-8">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-8">
          <Link href={pathname.split("/").slice(0, -1).join("/")}>
            <Image src={LeftArrowIcon} alt="left arrow" width={14} height={14} />
          </Link>
          <span className="text-3xl font-semibold text-primary">
            {mission.miss_intitule}
          </span>
        </div>
        <div><StatusDisplay value={mission.miss_addons?.status ?? ""} /></div>
      </div>
      <div className="flex justify-between gap-4 mb-8">
        <MissionCardStatus color="bg-gray-300" title="Coût carburant réel" value={0} />
        <MissionCardStatus color="bg-gray-300" title="Consommation réelle" value={0} />
        <MissionCardStatus color="bg-gray-300" title="Coût total réel" value={0} />
        <MissionCardStatus color="bg-gray-300" title="Variance budget" value={0} />
      </div>
      <div className="flex justify-between ">
        <div className="w-3/5 ">
          <div className="flex flex-col gap-4 mb-8">
            <span className="text-xs font-bold">Description</span>
            <span className="">{mission.miss_description}</span>
          </div>
          <div>
            <CardInfoMission title="" left={[
              {
                label: "Départ prévu",
                value: (mission.miss_expectedhourdeparture),
              },
              {
                label: "Durée estimée",
                value: (mission.miss_expectedduration),
              },
              {
                label: "Budget carburant estimée",
                value: (mission.miss_expectedfuelbudget),
              },
            ]} right={[
              {
                label: "Arrivée prévu",
                value: (mission.miss_expectedhourarrival),
              },
              {
                label: "Distance estimée",
                value: (mission.miss_expecteddistance),
              },
              {
                label: "Budget total estimé",
                value: (mission.miss_expectedtotalbudget),
              },
            ]} />
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-4 h-auto ">
          <SheetAffectationMission>

            <Button className="ml-auto border-2 border-primary hover:bg-primary hover:text-white flex items-center justify-between w-[15rem]"
              variant={"outline"}>
              <span><Image src={TagIcon} alt="" width={16} height={16} /></span>
              <span>Affecter</span>
            </Button>
          </SheetAffectationMission>
          <Card className="bg-secondary p-4 flex-1 ">
            <CardTitle className="font-semibold">DOCUMENTS</CardTitle>
            <CardContent className="grid  items-start grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 px-0">
              {mission.miss_addons?.documents.map((doc) => {
                return <CardFileMission key={doc.hashname} document={doc} />;
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionDisplaySection;
