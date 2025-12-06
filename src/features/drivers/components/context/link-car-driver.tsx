import { createContext, ReactNode, useState } from "react";


export interface ILinkCarDriver{
    modele: string;
    marque:string;
    immatriculation:string;
    id: string;
}

interface ILinkCarDriverList{

    list: ILinkCarDriver[];
    addToList?: (linkcardriver: ILinkCarDriver)=> void;
    removeToList?: (id: string)=> void;
    processItem: ILinkCarDriver | null;
    clearList?: ()=> void;
    setProcessItem?: (linkcardriver: ILinkCarDriver | null)=> void;

}

const LinkCarDriverContext = createContext<ILinkCarDriverList>({
    list:[],
    processItem:null
})

export const LinkCarDriverProvider = ({children}:{children:ReactNode})=>{

    const [list,setList] = useState<ILinkCarDriver[]>([]);
    const [processItem,setProcessItem] = useState<ILinkCarDriver | null>(null);

    const addToList = (linkcardriver: ILinkCarDriver)=>{
        setList([...list,linkcardriver])
    }
    const removeToList = (id:string)=>{
        setList((prev)=> {
          return   prev.filter((value)=> value.id === id)
        })
    }

    const clearList = ()=>{
        setList([])
    }

    
    return <LinkCarDriverContext.Provider value={{list:list,processItem: null,addToList,removeToList,clearList,setProcessItem: (item: ILinkCarDriver | null)=>{
        setProcessItem(item)
    }}}>{children}</LinkCarDriverContext.Provider>
}