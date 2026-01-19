import React from "react";
import { Progress } from "@/components/ui/progress";
import { Item, ItemContent } from "./ui/item";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const setStatusStyleClass = (
  stepIndex: number,
  currentIndex: number,
): string => {
  if (stepIndex < currentIndex) {
    return "border-black border";
  } else if (stepIndex == currentIndex) {
    return "border-white border";
  } else {
    return "";
  }
};

type ProgressStepProps = {
  stepIndex: number;
  title?: string;
  currentIndex: number;
};

type FormProgressProps = {
  steps: Array<{
    id: string;
    title?: string;
    render: () => React.ReactNode;
  }>;
  currentIndex: number;
};

const ProgressStep = ({
  stepIndex,
  title,
  currentIndex,
}: ProgressStepProps) => {
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

const FormProgress = ({ currentIndex, steps }: FormProgressProps) => {
  const value = (currentIndex / (steps.length - 1)) * 100;
  const widthFraction = ((steps.length - 1) / steps.length) * 100;

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
          className={`place-self-center absolute top-3 z-0`}
          style={{ width: `${widthFraction}%` }}
        />
      </ItemContent>
    </Item>
  );
};

export default FormProgress;
