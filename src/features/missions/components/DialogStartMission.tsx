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

export function AlertDialogStartMission({ children, miss_no }: { children: ReactNode, miss_no: string }) {

    const { mutate } = useChangeStatusMission()

    const changeStatusMissionHandler = () => {
        mutate({ json: { miss_no: miss_no, miss_status: "en_cours" } })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Voulez vous démarrer la mission ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onSubmit={changeStatusMissionHandler}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
