import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useGetMarqueCar} from '@/features/cars/api/use-get-marque-car';

const SelectModelContainer = ()=>{

    return <><SelectModel items={[{value:"3008",label:"3008"}]}/></>
  }

function SelectModel({
    items,
  onAction,
}: {
    items: {value:string;label:string}[];
  onAction?: (value: string) => void;
}) {
  return (
    <div className='flex-col flex gap-2 w-1/2'>
    <span>Modèle</span>
    <Select onValueChange={(value) => onAction!(value)} >
      <SelectTrigger className="w-full bg-white" disabled>
        <SelectValue className=" border-none"  placeholder="Modèle"/>
      </SelectTrigger>
      <SelectContent className=' '>
        <SelectGroup>
          <SelectLabel>Modele</SelectLabel>
          {items.map((item,i)=> (<SelectItem key={item.value + i} value={item.value}>{item.label}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
}
const SelectMarqueContainer = ()=>{
    const {data,isPending} = useGetMarqueCar()

    if (isPending) {
        return <></>
    }

    if (data?.result && data?.result.length <=0) {
        return <SelectMarque items={[]}/>
    }
    return <><SelectMarque items={data?.result.map((d)=> {return ({value: d.car_marque,label:d.car_marque})}) ?? []} /> </>
  }

function SelectMarque({
    items,
  onAction,
}: {
    items: {value:string;label:string}[];
  onAction?: (value: string) => void;
}) {
    console.log(items)
  return (
    <div className='flex-col flex gap-2 w-1/2'>
    <span>Marque</span>
    <Select onValueChange={(value) => onAction!(value)} >
      <SelectTrigger className="w-full bg-white">
        <SelectValue className=" border-none"  placeholder="Marque" />
      </SelectTrigger>
      <SelectContent className=' '>
        <SelectGroup>
          <SelectLabel>Modele</SelectLabel>
          {items.length >0 &&  items.map((item,i)=> (<SelectItem key={item.value + i} value={item.value }>{item.label}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
}
const SelectNumeroImmatriculationContainer = ()=>{
    return <><SelectNumeroImmatriculation items={[{value:"DK524",label:"DK524"}]}/></>
  }

function SelectNumeroImmatriculation({
    items,
  onAction,
}: {
    items: {value:string;label:string}[];
  onAction?: (value: string) => void;
}) {
  return (
    <div className='flex-col flex gap-2 w-full'>
    <span>Numéro d'immatriculation</span>
    <Select onValueChange={(value) => onAction!(value)} >
      <SelectTrigger className="w-full bg-white" disabled>
        <SelectValue className=" border-none"  placeholder="Immatriculation" />
      </SelectTrigger>
      <SelectContent className=' '>
        <SelectGroup>
          <SelectLabel>Immatriculation</SelectLabel>
          {items.map((item)=> (<SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
}





const LinkCarDriver = () => {
  return (
    <Card className='bg-[#E2ECF6] p-2 shadow-0'>
        <CardTitle className="text-base ">Affecter un véhicule</CardTitle>
        <CardContent className='flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-6'>
            <SelectMarqueContainer />
            <SelectModelContainer/>
            </div>
            <div className='w-full'><SelectNumeroImmatriculationContainer/></div>
        </CardContent>
    </Card>
  )
}

const LinkCarDriverContainer = ()=>{
    


    return <LinkCarDriver />
}

export default LinkCarDriverContainer