import CoachReel from "@/components/CoachReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import getPayloadClient from "@/get-payload";
import { formatPrice, getValidUrls } from "@/lib/utils";
import { GiTomato } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaTwitch } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@react-email/components";

interface IndividualCoachPageProps {
  params: {
    coachSlug: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Coaches", href: "/coaches" },
];

async function IndividualCoachPage({ params }: IndividualCoachPageProps) {
  const { coachSlug } = params;
  const payload = await getPayloadClient();

  const { docs: coaches } = await payload.find({
    collection: "coaches",
    limit: 1,
    where: {
      slug: {
        equals: coachSlug,
      },
    },
  });

  const [coach] = coaches;
  console.log(coach);
  if (!coach) {
    return notFound();
  }

  const img = getValidUrls(1, coach);

  return (
    <>
      <MaxWidthWrapper className="bg-white">
        <div className="bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg: gap-x-8 lg:px-8 lg:grid-cols-2">
            <div className="lg:max-w-xl lg:self-end">
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

              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {coach.name}
                </h1>
                <section className="mt-4">
                  <div className="text-muted-foreground flex">
                    {coach.categories.map((category, i) => {
                      if (i === 0) {
                        return <span key={i}>{category}</span>;
                      }
                      return (
                        <>
                          <span
                            className="pl-2 ml-2 border-l border-gray-300"
                            key={i}
                          >
                            {category}
                          </span>
                        </>
                      );
                    })}
                  </div>
                  <p className="font-medium text-gray-900 mt-2">
                    {formatPrice(coach.rate)}/hour
                  </p>
                  <div className="mt-4 space-y-6">
                    <div className="text-base text-muted-foreground">
                      {coach.about}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center text-gray-700">
                    <Link href={coach.tomatogg} className="flex">
                      <GiTomato className="text-2xl mr-2" />
                      <p className="text-muted-foreground">Tomato.gg</p>
                    </Link>

                    {coach.twitchtv && (
                      <>
                        <Separator
                          orientation="vertical"
                          className="mx-3 h-6"
                        />
                        <Link href={coach.twitchtv} className="flex">
                          <FaTwitch className="text-2xl mr-2" />
                          <p className="text-muted-foreground">Twitch.tv</p>
                        </Link>
                      </>
                    )}

                    {coach.youtube && (
                      <>
                        <Separator
                          orientation="vertical"
                          className="mx-3 h-6"
                        />

                        <Link href={coach.youtube} className="flex">
                          <FaYoutube className="text-2xl mr-2" />
                          <p className="text-muted-foreground">YouTube</p>
                        </Link>
                      </>
                    )}
                  </div>
                </section>
              </div>
            </div>
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-square rounded-lg">
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
              </div>
            </div>

            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <div>
                <div className="mt-10">
                  {/* <AddToCartButton product={product} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="flex justify-around">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>One Hour Session</CardTitle>
                <CardDescription>
                  Get started with {coach.name}!
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button className="w-full">Book Now</Button>
              </CardFooter>
            </Card>
          </div>
        </MaxWidthWrapper>
      </section>
      <MaxWidthWrapper>
        <CoachReel
          href="/coaches"
          query={{ limit: 12 }}
          title={`All Coaches`}
          subtitle={`Browse similar high-quality coaches just like '${coach.name}'`}
        />
      </MaxWidthWrapper>
    </>
  );
}

export default IndividualCoachPage;
