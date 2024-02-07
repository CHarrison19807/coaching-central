import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TankReel from "@/components/TankReel";
import getPayloadClient from "@/get-payload";
import { getValidUrls } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IndividualTankPageProps {
  params: {
    tankSlug: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Tank of the Week", href: "/tank-of-the-week" },
];

async function IndividualTankPage({ params }: IndividualTankPageProps) {
  const { tankSlug } = params;
  const payload = await getPayloadClient();

  const { docs: tanks } = await payload.find({
    collection: "tank-of-the-week",
    limit: 1,
    where: {
      slug: {
        equals: tankSlug,
      },
    },
  });

  const [tank] = tanks;

  if (!tank) {
    return notFound();
  }

  const img = getValidUrls(1, tank);

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-4 pb-16 pt-8 sm:px-6  ">
          <ol className="flex items-center space-x-2">
            {BREADCRUMBS.map((breadcrumb, index) => (
              <li key={breadcrumb.href}>
                <div className="flex items-center text-sm">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {breadcrumb.name}
                  </Link>
                  {index !== BREADCRUMBS.length - 1 ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <div className="flex mt-4 items-center text-muted-foreground">
            <div>{tank.nation}</div>
            <div className="ml-4  border-l border-gray-300  pl-4">
              {tank.type}
            </div>
          </div>
          <h2 className="text-3xl mt-2 font-bold tracking-tight text-gray-900 sm:text-4xl">
            {tank.title}
          </h2>
          <div className="mt-4 group relative bg-zinc-100 overflow-hidden rounded-xl">
            <div className="aspect-video  rounded-lg">
              <iframe
                className="h-full w-full object-cover object-center z-10"
                src={`https://www.youtube.com/embed/${tank.description}`}
              />
            </div>
          </div>
          <div className="mt-4 text-muted-foreground pb-16 justify-between md:flex md:flex-row md:px-10">
            <div className="font-medium flex-grow ">
              <div className="max-w-xl">{tank.description}</div>
            </div>
            <div className="shrink-0 md:pt-0 pt-2">
              Last updated:{" "}
              {new Date(tank.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
      <TankReel
        href={`/tank-of-the-week?type=${tank.type}`}
        query={{ type: tank.type as string, limit: 4 }}
        title={`More ${tank.type}s`}
        subtitle={`Check out more ${tank.type}s!`}
        cta={`View all ${tank.type?.toLowerCase()}s`}
      />

      {/* 
        Might not be necessary 

      <TankReel
        href={`/tank-of-the-week?nation=${tank.nation}`}
        query={{ nation: tank.nation as string, limit: 4 }}
        title={`More ${tank.nation} tanks`}
        subtitle={`Check out more tanks from ${tank.nation}!`}
      /> */}
    </MaxWidthWrapper>
  );
}

export default IndividualTankPage;
