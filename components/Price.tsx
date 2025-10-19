import React from "react";
import AEDSymbol from "./AEDSymbol";
import { formatPriceNumber } from "@/lib/utils";

interface PriceProps {
  amount: number;
  className?: string;
  symbolClassName?: string;
  symbolSize?: number;
  showDecimals?: boolean;
}

export default function Price({
  amount,
  className = "",
  symbolClassName = "",
  symbolSize = 16,
  showDecimals = true,
}: PriceProps) {
  const formattedPrice = formatPriceNumber(amount);
  
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <AEDSymbol size={symbolSize} className={symbolClassName} />
      <span>{formattedPrice}</span>
    </span>
  );
}

