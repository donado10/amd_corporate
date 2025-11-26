"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { driverSchema } from "../schema";
import { Input } from "@/components/ui/input";

type Props = {};

const CreateDriverSection = () => {
  const form = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      em_addons: {},
      em_type: "",
      em_address: "",
      em_birthday: "",
      em_birthplace: "",
      em_email: "",
      em_emergencynumber: "",
      em_firstname: "",
      em_lastname: "",
      em_no: "",
      em_nationality: "",
      em_phonenumber: "",
    },
  });

  return (
    <section className="flex flex-col gap-4 p-4 min-h-full border-2 border-red-900">
      <div className="w-full flex items-center justify-center">
        <span className="font-bold text-primary text-2xl">
          Ajouter un chauffeur
        </span>
      </div>
      <Form {...form}>
        <form className="grid grid-cols-2 grid-rows-12 h-full" action="">
          <FormField
            name="em_type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input {...field} className=" rounded-xl bg-[#D9D9D9]/80" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        {/* <form className="grid grid-cols-2 grid-rows-12 h-full" action="">
          <div></div>
          <div></div>
        </form> */}
      </Form>
    </section>
  );
};

export default CreateDriverSection;
