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
import { ReactNode } from "react"


const SelectAvailableCarContainer = () => {
    const { data, isPending } = useGetAvailableCar()

    if (isPending) {
        return <SelectAvailableCar items={[]} />
    }

    if (data?.result && data?.result.length <= 0) {
        return <SelectAvailableCar items={[]} />
    }
    return <><SelectAvailableCar onAction={(value: string) => { }} items={data?.result.map((d) => { return ({ value: d.car_no, label: d.car_addons.marque + ' ' + d.car_addons.modele + ' ' + d.car_addons.year }) }) ?? []} /> </>
}

function SelectAvailableCar({
    items,
    onAction,
}: {
    items: { value: string; label: string }[];
    onAction?: (value: string) => void;
}) {
    return (
        <div className='flex-col flex gap-2 w-full'>
            <span>Véhicules disponibles</span>
            <Select onValueChange={(value) => { onAction && onAction(value) }} >
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



const SelectAvailableDriverContainer = () => {
    const { data, isPending } = useGetAvailableDriver()

    if (isPending) {
        return <SelectAvailableDriver items={[]} />
    }

    if (data?.result && data?.result.length <= 0) {
        return <SelectAvailableDriver items={[]} />
    }
    return <><SelectAvailableDriver onAction={(value: string) => { }} items={data?.result.map((d) => { return ({ value: d.em_no, label: d.em_firstname + ' ' + d.em_lastname }) }) ?? []} /> </>
}

function SelectAvailableDriver({
    items,
    onAction,
}: {
    items: { value: string; label: string }[];
    onAction?: (value: string) => void;
}) {
    return (
        <div className='flex-col flex gap-2 w-full'>
            <span>Chauffeurs disponibles</span>
            <Select onValueChange={(value) => { onAction && onAction(value) }} >
                <SelectTrigger className="w-full bg-white">
                    <SelectValue className=" border-none" placeholder="Chauffeurs" />
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



export function SheetAffectationMission({ children }: { children: ReactNode }) {
    return (
        <Sheet  >
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side={"right"} className="max-w-2xl">
                <SheetHeader>
                    <SheetTitle>Affectation Mission</SheetTitle>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <SelectAvailableDriverContainer />
                    <SelectAvailableCarContainer />

                </div>
                <SheetFooter>
                    <Button type="submit">Confirmer</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Fermer</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
