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
import { missionActionSchema } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getCurrentDate, getCurrentTime } from "@/lib/utils"


const AlertStopMissionHandler = ({ miss_no, label }: { miss_no: string, label: string }) => {
    const form = useForm<z.infer<typeof missionActionSchema>>({
        resolver: zodResolver(missionActionSchema),
        defaultValues: {
            miss_no: miss_no,
            status: 'terminees',
            stopdate: getCurrentDate() as string,
            stophour: getCurrentTime()
        }
    })
    const { mutate } = useChangeStatusMission()


    const changeStatusMissionHandler = async (values: z.infer<typeof missionActionSchema>) => {
        mutate({ json: { miss_no: miss_no, status: values.status, startingdate: values.startingdate, startinghour: values.startinghour } })
    }


    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{label}</AlertDialogTitle>
            </AlertDialogHeader>
            <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(changeStatusMissionHandler)}>
                    <div >
                        <FormField
                            name={"stopdate"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date d'arrêt</FormLabel>
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
                            name={"stophour"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Heure d'arrêt</FormLabel>
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
                        <AlertDialogAction onClick={form.handleSubmit(changeStatusMissionHandler)}>Confirmer</AlertDialogAction>
                    </div>
                </form>
            </Form>
        </AlertDialogContent>
    )
}
const AlertStartMissionHandler = ({ miss_no, label }: { miss_no: string, label: string }) => {
    const form = useForm<z.infer<typeof missionActionSchema>>({
        resolver: zodResolver(missionActionSchema),
        defaultValues: {
            miss_no: miss_no,
            status: 'en_cours',
            startingdate: getCurrentDate(),
            startinghour: getCurrentTime()
        }
    })
    const { mutate } = useChangeStatusMission()


    const changeStatusMissionHandler = async (values: z.infer<typeof missionActionSchema>) => {
        mutate({ json: { miss_no: miss_no, status: values.status, startingdate: values.startingdate, startinghour: values.startinghour } })
    }


    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{label}</AlertDialogTitle>
            </AlertDialogHeader>
            <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(changeStatusMissionHandler)}>
                    <div >
                        <FormField
                            name={"startingdate"}
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
                            name={"startinghour"}
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
                        <AlertDialogAction onClick={form.handleSubmit(changeStatusMissionHandler)}>Confirmer</AlertDialogAction>
                    </div>
                </form>
            </Form>
        </AlertDialogContent>
    )
}

export function AlertDialogChangeStatusMission({ children, miss_no, miss_status, label }: { children: ReactNode, miss_no: string, miss_status: string, label: string }) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            {miss_status == 'en_cours' && <AlertStartMissionHandler miss_no={miss_no} label={label} />}
            {miss_status == 'terminees' && <AlertStartMissionHandler miss_no={miss_no} label={label} />}

        </AlertDialog>
    )
}

