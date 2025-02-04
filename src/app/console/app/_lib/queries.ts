import "server-only";

import { db } from "@/db";
import { user } from "@/db/schema";
import { and, asc, count, desc, eq, gt, gte, ilike, lte } from "drizzle-orm";

import { filterColumns } from "@/lib/filter-columns";
import { unstable_cache } from "@/lib/unstable-cache";

import { type GetUsersSchema } from "./validations";
import { userTableTags } from "./utils";

export async function getUsers(input: GetUsersSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage;
        const fromDate = input.from ? new Date(input.from) : undefined;
        const toDate = input.to ? new Date(input.to) : undefined;
        const advancedTable = input.flags.includes("advancedTable");

        const advancedWhere = filterColumns({
          table: user,
          filters: input.filters,
          joinOperator: input.joinOperator,
        });

        const where = advancedTable
          ? advancedWhere
          : and(
              input.name ? ilike(user.name, `%${input.name}%`) : undefined,
              input.email ? ilike(user.email, `%${input.email}%`) : undefined,
              input.emailVerified
                ? eq(
                    user.emailVerified,
                    (input.emailVerified === "true" && true) ||
                      (input.emailVerified === "false" && false)
                  )
                : undefined,
              input.role ? ilike(user.role, `%${input.role}%`) : undefined,
              input.banned
                ? eq(
                    user.banned,
                    (input.banned === "true" && true) ||
                      (input.banned === "false" && false)
                  )
                : undefined,
              input.banReason
                ? ilike(user.banReason, `%${input.banReason}%`)
                : undefined,
              input.banExpires
                ? ilike(user.banExpires, `%${input.banExpires}%`)
                : undefined,
              fromDate ? gte(user.createdAt, fromDate) : undefined,
              toDate ? lte(user.createdAt, toDate) : undefined
            );

        const orderBy =
          input.sort.length > 0
            ? input.sort.map((item) =>
                item.desc ? desc(user[item.id]) : asc(user[item.id])
              )
            : [asc(user.createdAt)];

        const { data, total } = await db.transaction(async (tx) => {
          const data = await tx
            .select()
            .from(user)
            .limit(input.perPage)
            .offset(offset)
            .where(where)
            .orderBy(...orderBy);

          const total = await tx
            .select({
              count: count(),
            })
            .from(user)
            .where(where)
            .execute()
            .then((res) => res[0]?.count ?? 0);

          return {
            data,
            total,
          };
        });

        const pageCount = Math.ceil(total / input.perPage);
        return { data, pageCount };
      } catch (err) {
        console.log(err);
        return { data: [], pageCount: 0 };
      }
    },
    [JSON.stringify(input)],
    {
      revalidate: 1,
      tags: [userTableTags[0]],
    }
  )();
}

export async function getUserBannedCounts() {
  return unstable_cache(
    async () => {
      try {
        const res = await db
          .select({
            status: user.banned,
            count: count(),
          })
          .from(user)
          .groupBy(user.banned)
          .having(gt(count(), 0));

        return res.reduce(
          (acc, { status, count }) => {
            const key = status.toString();
            acc[key] = count;
            return acc;
          },
          {} as Record<string, number>
        );
      } catch (err) {
        console.log(err);
        return {} as Record<string, number>;
      }
    },
    [userTableTags[1]],
    {
      revalidate: 1,
    }
  )();
}

export async function getUserVerifiedCounts() {
  return unstable_cache(
    async () => {
      try {
        const res = await db
          .select({
            value: user.emailVerified,
            count: count(),
          })
          .from(user)
          .groupBy(user.emailVerified)
          .having(gt(count(), 0));

        return res.reduce(
          (acc, { value, count }) => {
            const key = value.toString();
            acc[key] = count;
            return acc;
          },
          {} as Record<string, number>
        );
      } catch (err) {
        console.log(err);
        return {} as Record<string, number>;
      }
    },
    [userTableTags[2]],
    {
      revalidate: 1,
    }
  )();
}

// export async function getTaskPriorityCounts() {
//   return unstable_cache(
//     async () => {
//       try {
//         return await db
//           .select({
//             priority: tasks.priority,
//             count: count(),
//           })
//           .from(tasks)
//           .groupBy(tasks.priority)
//           .having(gt(count(), 0))
//           .then((res) =>
//             res.reduce(
//               (acc, { priority, count }) => {
//                 acc[priority] = count;
//                 return acc;
//               },
//               {} as Record<Task["priority"], number>
//             )
//           );
//       } catch (err) {
//         return {} as Record<Task["priority"], number>;
//       }
//     },
//     ["task-priority-counts"],
//     {
//       revalidate: 3600,
//     }
//   )();
// }
