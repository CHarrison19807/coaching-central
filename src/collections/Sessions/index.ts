import { CollectionConfig } from "payload/types";

export const Sessions: CollectionConfig = {
  slug: "sessions",
  access: {
    create: ({ req }) => req.user.role === "admin",
    read: () => true,
    update: () => true,
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "feedback",
      label: "Feedback",
      type: "textarea",
      required: false,
    },
    {
      name: "date",
      label: "Date of session (dd/mm/yyyy)",
      type: "date",
      required: false,
      admin: {
        date: {
          minDate: new Date(),
          displayFormat: "dd/MM/yyyy",
          pickerAppearance: "dayAndTime",
          timeIntervals: 15,
        },
      },
    },
    {
      name: "students",
      type: "array",
      labels: {
        singular: "Student",
        plural: "Students",
      },
      required: true,
      minRows: 1,
      fields: [
        {
          name: "student",
          label: "Student",
          type: "relationship",
          relationTo: "users",
          required: true,
        },
      ],
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: () => true,
        update: ({ req }) => req.user.role === "admin",
      },
    },
    {
      name: "coach",
      label: "Coach",
      type: "relationship",
      relationTo: "coaches",
      required: true,
    },
  ],
};
