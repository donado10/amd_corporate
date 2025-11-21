import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {};

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrent();

  console.log(user);

  if (!user) {
    redirect("/sign-in");
  }

  return <div>{children}</div>;
};

export default layout;
