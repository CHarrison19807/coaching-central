// import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { PrimaryActionEmailHtml } from "../../components/emails/PrimaryActionEmail";
import { CollectionConfig } from "payload/types";
export const Users: CollectionConfig = {
  slug: "users",

  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
    defaultColumns: ["id", "email"],
  },
  access: {
    read: ({ req }) => req.user.role === "admin",
    create: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,

      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Coach", value: "coach" },
      ],
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
    },
  ],
};
