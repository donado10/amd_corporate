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
import { missionActionSchema, missionSchema } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getCurrentDate, getCurrentTime } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import useCreateMission from "../api/use-create-mission"


const AlertCancelMissionHandler = ({ miss_no, label }: { miss_no: string, label: string }) => {
    const form = useForm<z.infer<typeof missionActionSchema>>({
        resolver: zodResolver(missionActionSchema),
        defaultValues: {
            miss_no: miss_no,
            status: 'echouees',
            failedcause: ""
        }
    })
    const { mutate } = useChangeStatusMission()


    const changeStatusMissionHandler = async (values: z.infer<typeof missionActionSchema>) => {
        mutate({ json: { miss_no: miss_no, status: values.status, stopdate: values.stopdate, stophour: values.stophour } })
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
                            name={"failedcause"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Motif annulation</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} value={field.value as string} ></Textarea>
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
const AlertStopMissionHandler = ({ miss_no, label }: { miss_no: string, label: string }) => {
    const form = useForm<z.infer<typeof missionActionSchema>>({
        resolver: zodResolver(missionActionSchema),
        defaultValues: {
            miss_no: miss_no,
            status: 'terminees',
            stopdate: getCurrentDate() as string,
            stophour: getCurrentTime(),
        }
    })
    const { mutate } = useChangeStatusMission()


    const changeStatusMissionHandler = async (values: z.infer<typeof missionActionSchema>) => {
        mutate({ json: { miss_no: miss_no, status: values.status, stopdate: values.stopdate, stophour: values.stophour } })
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
                                        <Input type="date" {...field} value={field.value as string} className=" rounded-md bg-[#D9D9D9]/80" />
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
                                        <Input type="date" {...field} value={field.value as string} className=" rounded-md bg-[#D9D9D9]/80" />
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
export const AlertReturnMissionHandler = ({ mission, label, children }: { children: ReactNode, mission: z.infer<typeof missionSchema>, label: string }) => {

    const { mutate } = useCreateMission()




    const ReturnMissionHandleSubmit = () => {
        mutate({ json: { ...mission, miss_addons: { status: 'créer', documents: mission.miss_addons?.documents ?? [], car: "", driver: "", datedepart: mission.miss_addons?.datedepart, heuredepart: mission.miss_addons?.heuredepart, failedcause: "", startingdate: "", startinghour: "", stopdate: "", stophour: "" } } })
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>


                <AlertDialogHeader>
                    <AlertDialogTitle>{label}</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="flex items-center gap-2 ml-auto">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={ReturnMissionHandleSubmit}>Confirmer</AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function AlertDialogChangeStatusMission({ children, miss_no, miss_status, label }: { children: ReactNode, miss_no: string, miss_status: string, label: string }) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            {miss_status == 'en_cours' && <AlertStartMissionHandler miss_no={miss_no} label={label} />}
            {miss_status == 'terminees' && <AlertStopMissionHandler miss_no={miss_no} label={label} />}
            {miss_status == 'echouees' && <AlertCancelMissionHandler miss_no={miss_no} label={label} />}

        </AlertDialog>
    )
}

