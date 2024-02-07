import { TankOfTheWeek } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, getValidUrls } from "@/lib/utils";
import slugify from "slugify";
import Image from "next/image";

interface TankItemProps {
  tank: TankOfTheWeek | null;
  index: number;
}
function TankItem({ tank, index }: TankItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  if (!tank || !isVisible) {
    return <TankPlaceholder />;
  }

  const slug = slugify(tank.title, { lower: true });

  const img = getValidUrls(1, tank);

  if (isVisible && tank) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/tank/${slug}`}
      >
        <div className="flex flex-col w-full">
          <Image src={img as string} alt={`Image of ${tank.title}`} />
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {tank.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">{tank.nation}</p>
          <p className="mt-1 text-sm text-gray-500">{tank.class}</p>
        </div>
      </Link>
    );
  }
}

function TankPlaceholder() {
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

export default TankItem;
