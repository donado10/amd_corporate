import React, { useContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUploadContext } from "./context/file-upload";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { driverSchema } from "../schema";
import z from "zod";
import { hashString } from "@/lib/utils";

type Props = {};

const invoices = [
  {
    file_name: "Ado.pdf",
    name: "Permis",
  },
];

const TableFilesUploadContainer = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof driverSchema>>;
}) => {
  const fileUploadCtx = useContext(FileUploadContext);

  useEffect(() => {
    if (fileUploadCtx.files) {
      form.setValue("em_addons.documents", [...fileUploadCtx.files]);
    }
  }, [JSON.stringify(fileUploadCtx.files)]);

  return (
    <Table className="w-fit rounded-md  overflow-hidden">
      <TableCaption>Liste de documents à charger.</TableCaption>
      <TableHeader className="bg-[#E2ECF6]">
        <TableRow>
          <TableHead className="w-[100px] ">Nom fichier</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fileUploadCtx.files &&
          fileUploadCtx.files.map((file, i) => (
            <TableRow key={file.file.name + i}>
              <TableCell className="font-medium">{file.file.name}</TableCell>
              <TableCell>
                {
                  <>
                    <Input
                      defaultValue={file.nom}
                      onChange={(e) => {
                        fileUploadCtx.updateFile!(file.file.name, {
                          file: file.file,
                          hashname: hashString(e.currentTarget.value),
                          nom: e.currentTarget.value,
                        });
                      }}
                      type="text"
                      className="bg-transparent h-4 shadow-none border-none"
                    />
                  </>
                }
              </TableCell>
              <TableCell className="text-right">{"..."}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TableFilesUploadContainer;
