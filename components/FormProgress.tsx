import React from "react";
import { Progress } from "@/components/ui/progress";
import { Item, ItemContent } from "./ui/item";

const setStatusStyleClass = (
  stepIndex: number,
  currentIndex: number,
): string => {
  if (stepIndex < currentIndex) {
    return "scale-[0.3]";
  } else if (stepIndex == currentIndex) {
    return "scale-100";
  } else {
    return "scale-0";
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
    <li className="text-center w-24 flex flex-col items-center">
      {/* <Button
        variant={currentIndex == stepIndex ? "default" : "secondary"}
        className={`size-8  ${statusStyle}`}
      >
        {stepIndex < currentIndex ? <Check /> : stepIndex + 1}
      </Button> */}
      <div className="grid place-items-center w-12 h-10 relative">
        <div
          className={`col-start-1 row-start-1 aspect-square w-12 rounded-full bg-primary/60 border border-2 border-white transition-transform duration-500 ease-out ${
            statusStyle
          }`}
        />
        <div
          className={`col-start-1 row-start-1 z-10 aspect-square w-4 rounded-full ${stepIndex < currentIndex ? "bg-(--ds-secondary-subtle) border-white border" : "bg-white"}`}
        />
      </div>
      <p className="text-(--ds-text-inverse) mt-5 font-[family-name:termina] uppercase font-bold">
        {title}
      </p>
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
          className={`place-self-center absolute top-5 z-0`}
          style={{ width: `${widthFraction}%` }}
        />
      </ItemContent>
    </Item>
  );
};

export default FormProgress;
