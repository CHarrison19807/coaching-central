import { TankOfTheWeek } from "@/payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import slugify from "slugify";

export const populateSlug: BeforeChangeHook<TankOfTheWeek> = async ({
  req,
  data,
}) => {
  const { title } = data;

  if (!title) throw new Error("Name is required");

  const slug = slugify(title, { lower: true });

  return {
    ...data,
    slug: slug,
  };
};
