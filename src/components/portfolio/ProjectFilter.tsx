"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATIONS } from "@/lib/services-locations/locations";
import { SERVICES } from "@/lib/services-locations/services";
import { getRecentCompletionYears } from "@/lib/portfolio/utils";

const ALL_VALUE = "all";

export function ProjectFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const years = getRecentCompletionYears();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === ALL_VALUE) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    const query = params.toString();
    router.push(query ? `/portfolio/?${query}` : "/portfolio/");
  }

  function clearFilters() {
    router.push("/portfolio/");
  }

  const category = searchParams.get("category") ?? ALL_VALUE;
  const location = searchParams.get("location") ?? ALL_VALUE;
  const year = searchParams.get("year") ?? ALL_VALUE;
  const hasActiveFilters =
    category !== ALL_VALUE || location !== ALL_VALUE || year !== ALL_VALUE;

  return (
    <div className="mb-stack-lg flex flex-col gap-4 rounded-lg border border-ink-700/10 bg-ink-50 p-4 md:flex-row md:flex-wrap md:items-end">
      <div className="min-w-[180px] flex-1">
        <label
          htmlFor="portfolio-category"
          className="mb-2 block text-sm font-medium text-ink-900"
        >
          Service
        </label>
        <Select
          value={category}
          onValueChange={(value) => updateParam("category", value)}
        >
          <SelectTrigger id="portfolio-category" className="w-full">
            <SelectValue placeholder="All services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All services</SelectItem>
            {SERVICES.map((service) => (
              <SelectItem key={service.slug} value={service.slug}>
                {service.shortTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[180px] flex-1">
        <label
          htmlFor="portfolio-location"
          className="mb-2 block text-sm font-medium text-ink-900"
        >
          Location
        </label>
        <Select
          value={location}
          onValueChange={(value) => updateParam("location", value)}
        >
          <SelectTrigger id="portfolio-location" className="w-full">
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All locations</SelectItem>
            {LOCATIONS.map((entry) => (
              <SelectItem key={entry.slug} value={entry.slug}>
                {entry.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[140px] flex-1">
        <label
          htmlFor="portfolio-year"
          className="mb-2 block text-sm font-medium text-ink-900"
        >
          Year completed
        </label>
        <Select
          value={year}
          onValueChange={(value) => updateParam("year", value)}
        >
          <SelectTrigger id="portfolio-year" className="w-full">
            <SelectValue placeholder="All years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All years</SelectItem>
            {years.map((entry) => (
              <SelectItem key={entry} value={String(entry)}>
                {entry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters ? (
        <Button type="button" variant="outline" onClick={clearFilters}>
          Clear filters
        </Button>
      ) : null}
    </div>
  );
}
