
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DateRangePicker } from "@/components/date-range-picker";
import { FeatureFlagsProvider } from "@/components/providers/feature-flags-provider";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { UsersTable } from "./_components/users-table";
import { SearchParams } from "@/types";
import { userSearchParamsCache } from "./_lib/validations";
import { getValidFilters } from "@/lib/data-table";
import {
  getUserBannedCounts,
  getUsers,
  getUserVerifiedCounts,
} from "./_lib/queries";

interface AppPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function AppPage(props: AppPageProps) {
  const searchParams = await props.searchParams;
  const search = userSearchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getUsers({
      ...search,
      filters: validFilters,
    }),
    getUserBannedCounts(),
    getUserVerifiedCounts(),
  ]);

  return (
    <FeatureFlagsProvider>
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60"
          align="end"
          shallow={false}
        />
      </React.Suspense>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={4}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["10rem", "25rem", "12rem", "12rem", "8rem", "8rem"]}
            shrinkZero
          />
        }
      >
        <UsersTable promises={promises} />
      </React.Suspense>
    </FeatureFlagsProvider>
  );
}
