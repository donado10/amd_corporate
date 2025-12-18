"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react"
import useChangeStatusMission from "../api/use-change-status-mission"
import { useForm } from "react-hook-form"
import z from "zod"
import { missionStartingSchema } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getCurrentDate, getCurrentTime } from "@/lib/utils"


const AlertStartMissionHandler = ({ label, onChangeStatus }: { label: string, onChangeStatus: () => void }) => {
    const form = useForm<z.infer<typeof missionStartingSchema>>({
        resolver: zodResolver(missionStartingSchema),
        defaultValues: {
            miss_no: "",
            miss_startingdate: getCurrentDate(),
            miss_startinghour: getCurrentTime()
        }
    })

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{label}</AlertDialogTitle>
            </AlertDialogHeader>
            <Form {...form}>
                <form className="flex flex-col gap-4">
                    <div >
                        <FormField
                            name={"miss_startingdate"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de départ</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} className=" rounded-md bg-[#D9D9D9]/80" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div >
                        <FormField
                            name={"miss_startinghour"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Heure de départ</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} value={getCurrentTime()} className=" rounded-md bg-[#D9D9D9]/80" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">

                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onSubmit={onChangeStatus}>Confirmer</AlertDialogAction>
                    </div>

                </form>
            </Form>
        </AlertDialogContent>
    )
}

export function AlertDialogChangeStatusMission({ children, miss_no, miss_status, label }: { children: ReactNode, miss_no: string, miss_status: string, label: string }) {

    const { mutate } = useChangeStatusMission()

    const changeStatusMissionHandler = () => {
        mutate({ json: { miss_no: miss_no, miss_status: miss_status } })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            {miss_status == 'en_cours' && <AlertStartMissionHandler label={label} onChangeStatus={changeStatusMissionHandler} />}

        </AlertDialog>
    )
}
