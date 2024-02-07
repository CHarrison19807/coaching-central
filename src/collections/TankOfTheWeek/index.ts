import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload/types";
import { TANK_CATEGORIES, TANK_NATIONS } from "../../config";
import { populateSlug } from "./hooks";

// ...

export const TankOfTheWeek: CollectionConfig = {
  slug: "tank-of-the-week",
  hooks: {
    beforeChange: [populateSlug],
  },
  access: {
    create: ({ req }) => req.user.role === "admin",
    read: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  admin: {
    defaultColumns: ["title", "date", "class", "nation"],
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      hidden: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "type",
      label: "Tank type",
      type: "select",
      options: TANK_CATEGORIES.map((category) => ({
        label: category,
        value: category,
      })),
    },
    {
      name: "nation",
      label: "Nation",
      type: "select",
      options: TANK_NATIONS.map((nation) => ({
        label: nation,
        value: nation,
      })),
    },
    {
      name: "link",
      label: "Youtube Link",
      type: "text",
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
