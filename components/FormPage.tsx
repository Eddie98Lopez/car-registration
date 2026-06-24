"use client";

import React from "react";

export function FormPage({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="font-medium font-[family-name:basset-four] text-3xl text-(--ds-text-accent)">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm opacity-70 max-w-[470px]">{description}</p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}

export function FormPageNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex items-center justify-between gap-3">{children}</nav>
  );
}
