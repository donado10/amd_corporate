import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import useGetAvailableCar from "@/features/drivers/api/use-get-available-car"
import useGetAvailableDriver from "@/features/drivers/api/use-get-available-drive"
import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import useAffectationMission from "../api/use-affectation-mission"


const SelectAvailableCarContainer = ({ defaultCar, onSetCar }: { defaultCar?: string, onSetCar: (value: string | null) => void }) => {
    const { data, isPending } = useGetAvailableCar()

    if (isPending) {
        return <SelectAvailableCar items={[]} />
    }

    if (data?.result && data?.result.length <= 0) {
        return <SelectAvailableCar items={[]} />
    }
    return <><SelectAvailableCar defaultCar={defaultCar} onAction={(value: string | null) => { onSetCar(value) }} items={data?.result.map((d) => { return ({ value: d.car_no, label: d.car_addons.marque + ' ' + d.car_addons.modele + ' ' + d.car_addons.year }) }) ?? []} /> </>
}

function SelectAvailableCar({
    items,
    onAction,
    defaultCar
}: {
    items: { value: string; label: string }[];
    onAction?: (value: string) => void;
    defaultCar?: string
}) {

    useEffect(() => {
        if (defaultCar && onAction) {

            onAction(defaultCar)
        }
    }, [defaultCar])

    return (
        <div className='flex-col flex gap-2 w-full'>
            <span>Véhicules</span>
            <Select defaultValue={defaultCar} onValueChange={(value) => { onAction && onAction(value) }} >
                <SelectTrigger className="w-full bg-white">
                    <SelectValue className=" border-none" placeholder="Véhicules" />
                </SelectTrigger>
                <SelectContent className=' '>
                    <SelectGroup>
                        <SelectLabel>Véhicules</SelectLabel>
                        {items.length > 0 &&
                            items.map((item, i) =>
                                (<SelectItem key={item.value + i} value={item.value}>{item.label}</SelectItem>))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}



const SelectAvailableDriverContainer = ({ defaultDriver, onSetDriver }: { defaultDriver?: string, onSetDriver: (value: string | null) => void }) => {
    const { data, isPending } = useGetAvailableDriver()

    if (isPending) {
        return <SelectAvailableDriver items={[]} />
    }

    if (data?.result && data?.result.length <= 0) {
        return <SelectAvailableDriver items={[]} />
    }
    return <><SelectAvailableDriver defaultDriver={defaultDriver} onAction={(value: string | null) => { onSetDriver(value) }} items={data?.result.map((d) => { return ({ value: d.em_no, label: d.em_firstname + ' ' + d.em_lastname }) }) ?? []} /> </>
}

function SelectAvailableDriver({
    items,
    onAction,
    defaultDriver
}: {
    items: { value: string; label: string }[];
    onAction?: (value: string) => void;
    defaultDriver?: string
}) {

    useEffect(() => {
        if (defaultDriver && onAction) {

            onAction(defaultDriver)
        }
    }, [defaultDriver])

    return (
        <div className='flex-col flex gap-2 w-full'>
            <span>Chauffeurs</span>
            <Select defaultValue={defaultDriver} onValueChange={(value) => { onAction && onAction(value) }} >
                <SelectTrigger className="w-full bg-white">
                    <SelectValue defaultValue={defaultDriver} className=" border-none" placeholder="Chauffeurs" />
                </SelectTrigger>
                <SelectContent className=' '>
                    <SelectGroup>
                        <SelectLabel>Chauffeurs</SelectLabel>
                        {items.length > 0 &&
                            items.map((item, i) =>
                                (<SelectItem key={item.value + i} value={item.value}>{item.label}</SelectItem>))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}



export function SheetAffectationMission({ defaultValue, children }: { children: ReactNode, defaultValue?: { car: string; driver: string } }) {
    const [driver, setDriver] = useState<string | null>()
    const [car, setCar] = useState<string | null>()
    const pathname = usePathname()
    const { mutate } = useAffectationMission()
    const [open, setOpen] = useState<boolean | undefined>(undefined)





    return (
        <Sheet open={open} onOpenChange={() => setOpen(undefined)}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side={"right"} className="max-w-2xl">
                <SheetHeader>
                    <SheetTitle>Affectation Mission</SheetTitle>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <SelectAvailableDriverContainer defaultDriver={defaultValue?.driver} onSetDriver={(value: string | null) => setDriver(value)} />
                    <SelectAvailableCarContainer defaultCar={defaultValue?.car} onSetCar={(value: string | null) => setCar(value)} />

                </div>
                <SheetFooter>
                    <Button type="submit" onClick={() => {
                        const miss_no = pathname.split('/').at(-1)
                        if (car && driver && miss_no) {
                            mutate({
                                json: {
                                    miss_no: miss_no,
                                    miss_car: car,
                                    miss_driver: driver
                                }
                            }, {
                                onSuccess: () => {

                                    setOpen(false)
                                }
                            })

                        }
                    }}>Confirmer</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Fermer</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
