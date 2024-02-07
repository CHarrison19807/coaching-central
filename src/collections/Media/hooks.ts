import { Media } from "@/payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const addUser: BeforeChangeHook<Media> = async ({ req, data }) => {
  const user = req.user;

  return { ...data, user: user.id };
};
