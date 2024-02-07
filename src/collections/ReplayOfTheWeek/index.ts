import { CollectionConfig } from "payload/types";
import { populateSlug } from "./hooks";

export const ReplayOfTheWeek: CollectionConfig = {
  slug: "replay-of-the-week",
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
    defaultColumns: ["title", "link", "date"],
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
      unique: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "link",
      label: "Youtube Link",
      type: "text",
      required: true,
    },
    {
      name: "date",
      label: "Date posted",
      type: "date",
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
