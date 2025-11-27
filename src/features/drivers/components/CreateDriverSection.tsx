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
import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TemplateUserIcon from "@/assets/images/template_user.svg";
import FilesUpload from "@/components/fileZone";

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

  const onSubmit = (values: z.infer<typeof driverSchema>) => {
    console.log("first");
  };

  return (
    <section className="flex flex-col gap-4 p-4 min-h-full ">
      <div className="w-full flex items-center justify-center">
        <span className="font-bold text-primary text-2xl">
          Ajouter un chauffeur
        </span>
      </div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 grid-rows-12 h-full gap-x-8"
          onSubmit={() => form.handleSubmit(onSubmit)}
        >
          <div className="rounded-md w-fit p-4 mb-4 bg-[#D9D9D9]  row-span-2 flex items-center justify-center">
            <Image src={TemplateUserIcon} alt="aa" />
          </div>
          <div className="col-start-1 col-end-1 row-start-3 row-end-4">
            <FormField
              name={"em_birthday"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      className=" rounded-md bg-[#D9D9D9]/80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" row-start-4 row-end-5">
            <FormField
              name={"em_nationality"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationalité</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-1 col-end-1 row-start-5 row-end-6">
            <FormField
              name={"em_phonenumber"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className=" rounded-md bg-[#D9D9D9]/80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-1 col-end-1 row-start-6 row-end-7">
            <FormField
              name={"em_addons.permis"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permis</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-1 col-end-1 row-start-7 row-end-8">
            <FormField
              name={"em_addons.date_embauche"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'embauche</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-1 col-end-1 row-start-8 row-end-9">
            <FormField
              name={"em_addons.cnss"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro CNSS</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-1 col-end-1 row-start-9 row-end-10">
            <FormField
              name={"em_addons.base_salary"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salaire de base</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-1 row-end-2">
            <FormField
              name={"em_firstname"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-2 row-end-3">
            <FormField
              name={"em_firstname"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-3 row-end-4">
            <FormField
              name={"em_birthplace"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lieu de naissance</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-4 row-end-5">
            <FormField
              name={"em_address"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-5 row-end-6">
            <FormField
              name={"em_email"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className=" rounded-md bg-[#D9D9D9]/80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-6 row-end-7">
            <FormField
              name={"em_emergencynumber"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact d'urgence</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-7 row-end-8">
            <FormField
              name={"em_addons.matricule"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de matricule</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-8 row-end-9">
            <FormField
              name={"em_addons.ipm"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro IPM</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-2 col-end-2 row-start-9 row-end-10">
            <FormField
              name={"em_addons.contract_type"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de contract</FormLabel>
                  <FormControl>
                    <Input {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-start-1 col-end-1 row-start-11 -row-end-1 ">
            <FilesUpload />
          </div>
          <Button
            className="col-start-2 col-end-2 row-start-11 -row-end-1"
            variant="default"
            type="submit"
          >
            Confirmer
          </Button>
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
