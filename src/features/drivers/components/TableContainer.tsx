"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./Table/table";

import { SelectAvailability, SelectContractType } from "./tableFilter";
import useGetDriverInfoTable from "../api/use-get-driver-info-table";
import { Input } from "@/components/ui/input";
import { useDriverStore } from "../store/store";
import { TDriverTableInfoSchema } from "../interface";


const TableDriverContainer = () => {

  const { data, isPending } = useGetDriverInfoTable();
  const driverStore = useDriverStore()
  const [filterDriver, setFilterDriver] = useState<TDriverTableInfoSchema[]>(driverStore.driverTableInfo)

  useEffect(() => {

    if (!isPending && data?.result && data.result.length > 0) {
      driverStore.setDriverTableInfo(data.result)
      setFilterDriver(data.result)
    } else {
      driverStore.setDriverTableInfo([])

    }

  }, [isPending, JSON.stringify(data)])

  useEffect(() => {

    const driversByName = driverStore.filter.driver_name ?
      driverStore.driverTableInfo.filter((driver) => { return driver.em_fullname.toLowerCase().includes(driverStore.filter.driver_name!.toLowerCase()) })
      : driverStore.driverTableInfo


    const driversByAvailability = driverStore.filter.availability ?
      driversByName.filter((driver) => { return driver.em_status.toLowerCase() === (driverStore.filter.availability!.toLowerCase()) })
      : driversByName

    console.log(driversByAvailability)
    const driversByContract = driverStore.filter.contract_type ?
      driversByAvailability.filter((driver) => { console.log("aaa", driver.em_contract); return driver.em_contract.toLowerCase() === (driverStore.filter.contract_type!.toLowerCase()) })
      : driversByAvailability

    setFilterDriver(driversByContract)
  }, [JSON.stringify(driverStore.filter)])


  return (
    <div className="flex flex-col gap-8">
      <div className=" flex items-center justify-between">
        <div>
          <span className="border  h-10  flex items-center justify-center p-2 rounded-2xl "><Input onChange={(e) => driverStore.setFilter({ ...driverStore.filter, driver_name: e.currentTarget.value.trim() })} placeholder="Rechercher chauffeur" className="h-8 border-none shadow-none" /></span>
        </div>
        <div className="flex items-center gap-2">
          <SelectAvailability onAction={(value) => { driverStore.setFilter({ ...driverStore.filter, availability: value }) }} />
          <SelectContractType onAction={(value) => { driverStore.setFilter({ ...driverStore.filter, contract_type: value }) }} />
        </div>
      </div>
      <DataTable
        data={
          filterDriver
        }
      />
    </div>
  );
};

export default TableDriverContainer;
