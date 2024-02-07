"use client";

import { TTankQueryValidator } from "@/lib/validators/queryValidator";
import { TankOfTheWeek } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import TankItem from "./TankItem";

interface TankReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TTankQueryValidator;
  cta?: string;
}

const FALLBACK_LIMIT = 4;

function TankReel(props: TankReelProps) {
  const { title, subtitle, href, query, cta } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteTanks.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const tanks = queryResults?.pages?.flatMap((page) => page.items);

  let map: (TankOfTheWeek | null)[] = [];

  if (tanks && tanks.length) {
    map = tanks;
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
            {cta} <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {map.map((tank, i) => (
              <TankItem key={`product-${i}`} tank={tank} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TankReel;
