import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ReplayReel from "@/components/ReplayReel";
// import ProductReel from "@/components/ProductReel";
import getPayloadClient from "@/get-payload";
import { getValidUrls } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IndividualProductPageProps {
  params: {
    replaySlug: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Replay of the Week", href: "/replay-of-the-week" },
];

async function IndividualReplayPage({ params }: IndividualProductPageProps) {
  const { replaySlug } = params;
  const payload = await getPayloadClient();

  const { docs: replays } = await payload.find({
    collection: "replay-of-the-week",
    limit: 1,
    where: {
      slug: {
        equals: replaySlug,
      },
    },
  });

  const [replay] = replays;

  if (!replay) {
    return notFound();
  }

  const img = getValidUrls(1, replay);

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl  px-4 pb-16 pt-8 sm:px-6  ">
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

        <h1 className="text-3xl mt-2 font-bold tracking-tight text-gray-900 sm:text-4xl">
          {replay.title}
        </h1>

        <div className="mt-4 group relative bg-zinc-100 overflow-hidden rounded-xl">
          <div className="aspect-video  rounded-lg">
            <iframe
              className="h-full w-full object-cover object-center z-10"
              src={`https://www.youtube.com/embed/${replay.link}`}
            />
          </div>
        </div>
        <div className="mt-4 text-muted-foreground pb-16 justify-between md:flex md:flex-row md:px-10">
          <div className="font-medium flex-grow ">
            <div className="max-w-xl">{replay.description}</div>
          </div>
          <div className="shrink-0 md:pt-0 pt-2">
            Last updated:{" "}
            {new Date(replay.updatedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
        <ReplayReel
          href="/replay-of-the-week"
          query={{ limit: 4 }}
          title={`Recent replays`}
          subtitle={`Check out our most recent replays!`}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default IndividualReplayPage;
