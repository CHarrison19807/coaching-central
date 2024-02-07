"use client";

import { TReplayQueryValidator } from "@/lib/validators/queryValidator";
import { ReplayOfTheWeek } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "./ReplayItem";
import ReplayItem from "./ReplayItem";

interface ReplayReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TReplayQueryValidator;
}

const FALLBACK_LIMIT = 4;

function ReplayReel(props: ReplayReelProps) {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteReplays.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const replays = queryResults?.pages?.flatMap((page) => page.items);

  let map: (ReplayOfTheWeek | null)[] = [];

  if (replays && replays.length) {
    map = replays;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT);
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            View all replays <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {map.map((replay, i) => (
              <ReplayItem key={`product-${i}`} replay={replay} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReplayReel;
