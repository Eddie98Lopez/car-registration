import React from "react";
import { Progress } from "@/components/ui/progress";
import { Item, ItemContent } from "./ui/item";
import { Button } from "./ui/button";

const ProgressStep = ({ stepIndex, title, currentIndex }) => {
  return (
    <li className="text-center w-24 ">
      <Button
        variant={currentIndex == stepIndex ? "outline" : "secondary"}
        className="size-8"
      >
        {stepIndex + 1}
      </Button>
      <p className={`${currentIndex == stepIndex && "font-bold"}`}>{title}</p>
    </li>
  );
};

const FormProgress = ({ length, currentIndex, steps }) => {
  const value = (currentIndex / (length - 1)) * 100;

  return (
    <Item variant="outline" className="bg-white">
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
          className={`w-${
            length - 1
          }/${length} place-self-center absolute top-3 z-0`}
        />
      </ItemContent>
    </Item>
  );
};

export default FormProgress;
