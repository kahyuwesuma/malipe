"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr"
import { Label } from "@/components/ui/label"

export default function DatePicker({ value, onChange, required }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">Tanggal</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
            type="button"
          >
            {value ? format(value, "dd/MM/yyyy") : "Pilih tanggal"}
            <CaretDownIcon size={32} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            className="font-AktivGrotesk-Regular"
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
            initialFocus
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
