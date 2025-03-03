'use client'
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Currencies, TCurrency } from "@/types/currency"
import { cn } from "@/lib/utils"

export function Currency({ className }: Readonly<{ className?: string }>) {
  const [selectedCurrency, setSelectedCurrency] = React.useState<TCurrency>(
    Currencies.find(e => e.code === "usd") ?? Currencies[0]
  )

  const handleChange = (value: string) => {
    const currency = Currencies.find(e => e.code === value)
    if (currency) {
      setSelectedCurrency(currency)
    }
  }

  return (
    <div className={cn(className)}>
      <Select value={selectedCurrency.code} onValueChange={handleChange}>
        <SelectTrigger className="line-clamp-1 flex gap-1">
          <span className="uppercase font-bold">{selectedCurrency.code}</span>
          <span>{selectedCurrency.symbol}</span>
        </SelectTrigger>
        <SelectContent>
          {Currencies.map(currency => (
            <SelectItem key={currency.code} value={currency.code} className="cursor-pointer">
              <div className="flex space-x-1 items-center">
                <span className="font-light">{currency.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
