import { getSelectedDriver } from "@/features/drivers/actions";
import DriverDisplaySection from "@/features/drivers/components/DriverDisplaySection";
import React from "react";

const page = async ({ params }: { params: Promise<{ driver_id: string }> }) => {
  const { driver_id } = await params;

  const driver = await getSelectedDriver(driver_id);

  return <DriverDisplaySection driver={driver} />;
};

export default page;
