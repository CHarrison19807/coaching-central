import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { stripe } from "../../lib/stripe";
import { Coach } from "@/payload-types";
import slugify from "slugify";

export const stripeConfig: BeforeChangeHook<Coach> = async (args) => {
  if (args.operation === "create") {
    const data = args.data as Coach;

    const createdProduct = await stripe.products.create({
      name: "1 Hour Coaching Session with " + data.name,
      default_price_data: {
        currency: "usd",
        unit_amount: Math.round(data.rate * 100),
      },
    });

    const updated: Coach = {
      ...data,
      stripeId: createdProduct.id,
      priceId: createdProduct.default_price as string,
    };

    return updated;
  } else if (args.operation === "update") {
    const data = args.data as Coach;

    const updatedProduct = await stripe.products.update(data.stripeId!, {
      name: data.name,
      default_price: data.priceId!,
    });

    const updated: Coach = {
      ...data,
      stripeId: updatedProduct.id,
      priceId: updatedProduct.default_price as string,
    };

    return updated;
  }
};

export const populateSlug: BeforeChangeHook<Coach> = async ({ req, data }) => {
  const { name } = data;

  if (!name) throw new Error("Name is required");

  const slug = slugify(name, { lower: true });

  return {
    ...data,
    slug: slug,
  };
};

export const addUser: BeforeChangeHook<Coach> = async ({ req, data }) => {
  const user = req.user;

  return { ...data, user: user.id };
};
