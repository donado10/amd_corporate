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
import { FilesUploadContainer } from "@/features/drivers/components/fileZone";
import { FilesUploadProvider } from "./context/file-upload";
import TableFilesUploadContainer from "./TableFilesUploadContainer";
import useCreateDriver from "../api/use-create-driver";
import useUploadDocumentDriver from "../api/use-upload-documents-driver";
import useDeleteDocumentDriver from "../api/use-delete-documents-driver";

function formDataToObject(formData: FormData) {
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    // If the value is a File, keep it as-is
    obj[key] = value instanceof File ? value : value.toString();
  });

  return obj;
}

const CreateDriverSection = () => {
  const form = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      em_addons: {
        permis: "",
        base_salary: "",
        cnss: "",
        contract_type: "",
        date_embauche: "",
        documents: [],
        ipm: "",
        matricule: "",
      },
      em_type: "1",
      em_address: "",
      em_birthday: "",
      em_birthplace: "",
      em_email: "",
      em_emergencynumber: "",
      em_firstname: "",
      em_lastname: "",
      em_no: "0",
      em_nationality: "",
      em_phonenumber: "",
    },
  });

  const { mutate } = useCreateDriver();
  const mutateUploadDocuments = useUploadDocumentDriver();
  const mutateDeleteDocuments = useDeleteDocumentDriver();
  console.log(form.formState.errors);

  const onSubmit = async (values: z.infer<typeof driverSchema>) => {
    let filesID: string[] = [];

    try {
      for (let index = 0; index < values.em_addons.documents.length; index++) {
        const form = new FormData();

        form.append(`file`, values.em_addons.documents[index].file);
        form.append(`hashname`, values.em_addons.documents[index].hashname);
        form.append(`nom`, values.em_addons.documents[index].nom);

        const { id: fileID } = await mutateUploadDocuments({
          form: {
            file: form.get("file") as File,
            hashname: form.get("hashname") as string,
            nom: form.get("nom") as string,
          },
        });

        filesID = [...filesID, fileID];

        values.em_addons.documents[index].file = fileID;
      }
    } catch (error) {
      if (filesID.length > 0) {
        await mutateDeleteDocuments({ json: { files: [...filesID] } });
        return;
      }
      return;
    }

    mutate(
      { json: values },
      {
        onError: async () => {
          await mutateDeleteDocuments({ json: { files: [...filesID] } });
        },
      }
    );
  };

  return (
    <section className="flex flex-col gap-4 p-4 min-h-full ">
      <div className="w-full flex items-center justify-center mb-4">
        <span className="font-bold text-primary text-2xl">
          Ajouter un chauffeur
        </span>
      </div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 grid-rows-16 h-full gap-x-8"
          onSubmit={form.handleSubmit(onSubmit)}
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
              name={"em_lastname"}
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
          <div className="col-start-1 col-end-1 row-start-10 -row-end-1 ">
            <FilesUploadProvider>
              <FormField
                name="em_addons.documents"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-4">
                    <FilesUploadContainer />
                    <TableFilesUploadContainer form={form} />
                  </div>
                )}
              />
            </FilesUploadProvider>
          </div>
          <div className="col-start-2 col-end-2 row-start-11 -row-end-1">
            <div className="ml-auto gap-4 flex items-center w-fit">
              <Button
                variant="destructive"
                type="submit"
                className=" text-white"
              >
                Annuler
              </Button>
              <Button
                variant="default"
                type="submit"
                className="bg-[#34C759] text-white"
              >
                Confirmer
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateDriverSection;
