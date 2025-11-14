"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="w-full bg-white border-b">
      <div className="mx-auto px-6 py-6 flex flex-col">
        <h2 className="text-[22px] font-semibold text-[#0F6A6A]">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
