"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { Card, CardContent } from "./ui/card";

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
    render: () => React.ReactNode;
  }>;
};

export default function MultiPageForm({
  title = "Multipage form",
  steps,
}: MultiPageFormProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const totalSteps = steps.length;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  const goNext = () => setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  const goPrev = () => setStepIndex((i) => Math.max(i - 1, 0));
  const goTo = (index: number) =>
    setStepIndex(Math.max(0, Math.min(index, totalSteps - 1)));

  const value = useMemo<WizardCtx>(
    () => ({ stepIndex, totalSteps, isFirst, isLast, goNext, goPrev, goTo }),
    [stepIndex, totalSteps, isFirst, isLast]
  );

  const ActiveStep = steps[stepIndex];

  return (
    <WizardContext.Provider value={value}>
      {/* Write a component here that has a progression of how far along you are in the process */}
      <Card className="min-w-lg min-h-32">
        <CardContent className="space-y-6">
          <header className="space-y-1">
            <div className="font-medium">{title}</div>
            <div className="text-sm opacity-70">
              Page {stepIndex + 1} of {totalSteps}
            </div>
          </header>

          {/* Step body (page controls its own nav/buttons) */}
          <div className="space-y-6">{ActiveStep.render()}</div>
        </CardContent>
      </Card>
    </WizardContext.Provider>
  );
}
