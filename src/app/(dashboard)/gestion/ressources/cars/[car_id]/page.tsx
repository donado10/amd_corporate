import { getSelectedCar } from "@/features/cars/actions";
import CarDisplaySection from "@/features/cars/components/CarDisplaySection";
import React from "react";

type Props = {};

const page = async ({ params }: { params: Promise<{ car_id: string }> }) => {
  const { car_id } = await params;

  const car = await getSelectedCar(car_id);

  return (
    <div>
      <CarDisplaySection Car={car} />
    </div>
  );
};

export default page;
