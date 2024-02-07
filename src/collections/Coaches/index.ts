import { Access, CollectionConfig } from "payload/types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { User, Coach } from "../../payload-types";
import { addUser, populateSlug, stripeConfig } from "./hooks";

const isCoachOrAdmin: Access = ({ req: { user: _user } }) => {
  const user = _user as User | undefined;
  if (!user) return false;
  if (user.role === "admin" || user.role === "coach") return true;
  return false;
};

const isSelforAdmin: Access = ({ req: { user: _user } }) => {
  const user = _user as User | undefined;
  if (!user) return false;
  if (user.role === "admin") return true;
  return {
    id: {
      equals: user.id,
    },
  };
};

export const Coaches: CollectionConfig = {
  slug: "coaches",
  admin: {
    useAsTitle: "name",
  },
  hooks: {
    beforeChange: [populateSlug, addUser, stripeConfig],
  },
  access: {
    read: isSelforAdmin,
    create: isCoachOrAdmin,
    update: isSelforAdmin,
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      hidden: true,
    },
    {
      name: "tomatogg",
      type: "text",
      label: "Tomato.gg",
      required: true,
    },
    {
      name: "twitchtv",
      type: "text",
      label: "Twitch.tv",
      required: false,
    },
    {
      name: "youtube",
      type: "text",
      label: "Youtube Channel",
      required: false,
    },
    {
      name: "about",
      type: "textarea",
      label: "About",
    },
    {
      name: "region",
      type: "select",
      options: [
        { label: "NA", value: "NA" },
        { label: "EU", value: "EU" },
        { label: "APAC", value: "APAC" },
      ],
      required: true,
    },
    {
      name: "preference",
      label: "Preferred Coaching Type",
      type: "select",
      options: [
        { label: "Random Battles", value: "Random Battles" },
        { label: "7v7 Competitive", value: "7v7 Competitive" },
        { label: "15v15 Competitive", value: "15v15 Competitive" },
        { label: "Calling", value: "Calling" },
        { label: "Onslaught", value: "Onslaught" },
      ],
      required: true,
    },
    {
      name: "categories",
      label: "Possible Coaching Types",
      type: "select",
      options: [
        { label: "Random Battles", value: "Random Battles" },
        { label: "7v7 Competitive", value: "7v7 Competitive" },
        { label: "15v15 Competitive", value: "15v15 Competitive" },
        { label: "Calling", value: "Calling" },
        { label: "Onslaught", value: "Onslaught" },
      ],
      hasMany: true,
      required: true,
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "rate",
      label: "Rate per hour in USD",
      min: 0,
      max: 1000,
      type: "number",
      required: true,
    },
    {
      name: "image",
      label: "Profile Picture",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
