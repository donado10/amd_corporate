"use client"

import React from "react";

import dynamic from 'next/dynamic'; // Composant LeafletMap chargé dynamiquement 
import Map from "@/components/Map/Map";


const page = () => {
  return <div className="w-full h-[70vh] "><Map /></div>;
};

export default page;
