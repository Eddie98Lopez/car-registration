import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Item, ItemContent } from "./ui/item";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

type StepStatus = "not complete" | "current" | "complete";
const setStatusStyleClass = (stepIndex, currentIndex) => {
  if (stepIndex < currentIndex) {
    return "border-black border";
  } else if (stepIndex == currentIndex) {
    return "border-white border";
  } else {
    return "";
  }
};

const ProgressStep = ({ stepIndex, title, currentIndex }) => {
  const statusStyle = setStatusStyleClass(stepIndex, currentIndex);
  return (
    <li className="text-center w-24 ">
      <Button
        variant={currentIndex == stepIndex ? "default" : "secondary"}
        className={`size-8  ${statusStyle}`}
      >
        {stepIndex < currentIndex ? <Check /> : stepIndex + 1}
      </Button>
      <p>{title}</p>
    </li>
  );
};

const FormProgress = ({ length, currentIndex, steps }) => {
  const value = (currentIndex / (length - 1)) * 100;

  const widthFraction = `w-${length - 1}/${length}`.toString();

  return (
    <Item variant="default" className=" ">
      <ItemContent className="relative">
        <ul className="flex justify-around w-full z-1">
          {steps.map((step, i) => (
            <ProgressStep
              key={`progress-step-${i}`}
              stepIndex={i}
              title={step.title}
              currentIndex={currentIndex}
            />
          ))}
        </ul>
        <Progress
          value={value}
          className={`${widthFraction} place-self-center absolute top-3 z-0`}
        />
      </ItemContent>
    </Item>
  );
};

export default FormProgress;
