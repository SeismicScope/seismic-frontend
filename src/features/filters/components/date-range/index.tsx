"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Field } from "@/shared/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { useFilters } from "../../hooks/use-filters";

function DatePickerWithRange() {
  const { filters, setFilters } = useFilters();

  return (
    <Field className="mx-auto w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal"
          >
            <CalendarIcon />
            {filters.dateFrom ? (
              filters.dateTo ? (
                <>
                  {format(filters.dateFrom, "LLL dd, y")} -{" "}
                  {format(filters.dateTo, "LLL dd, y")}
                </>
              ) : (
                format(filters.dateFrom, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={new Date()}
            selected={{
              from: filters.dateFrom || undefined,
              to: filters.dateTo || undefined,
            }}
            onSelect={(date) => {
              if (date?.from && date?.to) {
                setFilters({
                  dateFrom: date.from,
                  dateTo: date.to,
                });

                return;
              }

              if (date?.from) {
                setFilters({
                  dateFrom: date.from,
                  dateTo: null,
                });
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}

export default DatePickerWithRange;
