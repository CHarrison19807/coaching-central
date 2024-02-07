import { ReplayOfTheWeek } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, getValidUrls } from "@/lib/utils";
import slugify from "slugify";
import Image from "next/image";

interface ReplayItemProps {
  replay: ReplayOfTheWeek | null;
  index: number;
}
function ReplayItem({ replay, index }: ReplayItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  if (!replay || !isVisible) {
    return <ReplayPlaceholder />;
  }

  const slug = slugify(replay.title, { lower: true });

  const img = getValidUrls(1, replay);

  if (isVisible && replay) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/replay-of-the-week/${slug}`}
      >
        <div className="flex flex-col w-full">
          <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
            <div className="absolute z-10 inset-0  transition">
              <Image
                fill
                src={img as string}
                alt={`Image of ${replay.title}`}
              />
            </div>
          </div>
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {replay.title}
          </h3>
        </div>
      </Link>
    );
  }
}

function ReplayPlaceholder() {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
}

export default ReplayItem;
