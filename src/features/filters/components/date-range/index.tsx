"use client";

import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { useFilters } from "@/features/filters/hooks/use-filters";
import { DATE_RANGE_END, DATE_RANGE_START } from "@/shared/constants";
import { formatDate } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Field } from "@/shared/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

function DatePickerWithRange() {
  const { filters, setFilters } = useFilters();

  const onDateSelect = useCallback(
    (date?: DateRange): void => {
      if (!date?.from) return;

      if (date.from && date.to && date.from > date.to) {
        toast.error("Start date must be before end date");

        return;
      }

      setFilters({
        dateFrom: date.from,
        dateTo: date.to ?? null,
      });
    },
    [setFilters],
  );

  return (
    <Field className="mx-auto w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal"
            aria-label="Date range picker button"
          >
            <CalendarIcon />
            {filters.dateFrom ? (
              filters.dateTo ? (
                <>
                  {formatDate(filters.dateFrom)} - {formatDate(filters.dateTo)}
                </>
              ) : (
                formatDate(filters.dateFrom)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <p className="text-muted-foreground px-3 pt-3 text-center text-xs">
            Available: {formatDate(DATE_RANGE_START)} —{" "}
            {formatDate(DATE_RANGE_END)}
          </p>
          <Calendar
            mode="range"
            defaultMonth={DATE_RANGE_START}
            startMonth={DATE_RANGE_START}
            endMonth={DATE_RANGE_END}
            selected={{
              from: filters.dateFrom || undefined,
              to: filters.dateTo || undefined,
            }}
            onSelect={onDateSelect}
            numberOfMonths={2}
            aria-label="Date range picker calendar"
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}

export default DatePickerWithRange;
