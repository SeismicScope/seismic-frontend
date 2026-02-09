import React, { memo } from "react";

function HistogramBar({
  heightPercent,
  isActive,
}: {
  heightPercent: number;
  isActive: boolean;
}) {
  return (
    <div
      className={`flex-1 self-end rounded-t-sm transition-colors duration-150 ${
        isActive ? "bg-primary" : "bg-border"
      }`}
      style={{
        height: `${heightPercent}%`,
        minHeight: heightPercent > 0 ? 2 : 0,
      }}
    />
  );
}

export default memo(HistogramBar);
