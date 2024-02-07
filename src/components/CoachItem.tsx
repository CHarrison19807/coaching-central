import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice, getValidUrls } from "@/lib/utils";
import slugify from "slugify";
import { Coach } from "@/payload-types";
import Image from "next/image";

interface CoachItemProps {
  coach: Coach | null;
  index: number;
}
function CoachItem({ coach, index }: CoachItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  if (!coach || !isVisible) {
    return <CoachPlaceholder />;
  }

  const slug = slugify(coach.name, { lower: true });

  const img = getValidUrls(1, coach);

  if (isVisible && coach) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/coaches/${slug}`}
      >
        <div className="flex flex-col w-full">
          <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
            <div className="absolute z-10 inset-0  transition">
              <Image
                fill
                src={img as string}
                alt={`Profile picture of ${coach.name}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <h3 className="text-lg text font-medium text-gray-700">
              {coach.name}
            </h3>
            {coach.region === "NA" ? (
              <span aria-label="North America">NA</span>
            ) : coach.region === "EU" ? (
              <span aria-label="Europe">EU</span>
            ) : (
              <span aria-label="Asia">APAC</span>
            )}
          </div>

          <p className=" mt-1 text-gray-500 text-sm">
            Expertise: {coach.preference}
          </p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(coach.rate)}/hr
          </p>
        </div>
      </Link>
    );
  }
}

function CoachPlaceholder() {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-2 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
}

export default CoachItem;
