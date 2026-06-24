"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-[100vh] grid place-content-center place-items-center gap-2">
      <h3 className="text-center text-(--ds-text-inverse) uppercase font-bold text-2xl font-[family-name:termina] w-max tracking-[.15em] ml-5 animate__animated animate__fadeInLeft">{`Turlocks's 5'th Annual`}</h3>
      <h1 className="text-center flex flex-col items-center justify-center text-(--ds-text-inverse) font-[family-name:basset-four] text-[12rem]/[85%] my-0">
        <span className="block w-max animate__animated animate__fadeInLeft">
          Truck
        </span>{" "}
        <span className="block w-max animate__animated animate__fadeInLeft">
          Show
        </span>
      </h1>
      <Link href={"/register"}>
        <Button className="text-5xl h-[80px] mt-8 -skew-x-6 px-8">
          Register Truck
        </Button>
      </Link>
    </div>
  );
}
