"use client";

import React, { createContext, useContext, useState } from "react";
import { Card, CardContent } from "./ui/card";

import FormProgress from "./FormProgress";

type WizardCtx = {
  stepIndex: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
};

const WizardContext = createContext<WizardCtx | null>(null);

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside <MultiPageForm />");
  return ctx;
}

type MultiPageFormProps = {
  title?: string;
  steps: Array<{
    id: string;
    title: string;
    render: () => React.ReactNode;
  }>;
};

export default function MultiPageForm({ steps }: MultiPageFormProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const totalSteps = steps.length;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  const goNext = () => setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  const goPrev = () => setStepIndex((i) => Math.max(i - 1, 0));
  const goTo = (index: number) =>
    setStepIndex(Math.max(0, Math.min(index, totalSteps - 1)));

  const value: WizardCtx = {
    stepIndex,
    totalSteps,
    isFirst,
    isLast,
    goNext,
    goPrev,
    goTo,
  };

  const ActiveStep = steps[stepIndex];

  return (
    <WizardContext.Provider value={value}>
      <div className=" flex flex-col gap-4 ">
        <FormProgress currentIndex={stepIndex} steps={steps} />
        <Card className="min-w-xl min-h-32 border-6 border-solid [border-image:var(--chrome-gradient)_1]">
          <CardContent className="space-y-6">
            {/* Step body (page controls its own nav/buttons) */}
            <div className="space-y-6">{ActiveStep.render()}</div>
          </CardContent>
        </Card>
      </div>
    </WizardContext.Provider>
  );
}
