import React from "react";

type Props = {};

const page = async ({ params }: { params: Promise<{ driver_id: string }> }) => {
  const { driver_id } = await params;
  return <div>{driver_id}</div>;
};

export default page;
