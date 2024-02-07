import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import dotenv from "dotenv";
import { Users } from "./collections/Users/index";
import { Coaches } from "./collections/Coaches/index";
import { Media } from "./collections/Media/index";
import { TankOfTheWeek } from "./collections/TankOfTheWeek";
import { ReplayOfTheWeek } from "./collections/ReplayOfTheWeek";
import { Orders } from "./collections/Orders";
import { Sessions } from "./collections/Sessions";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [
    Users,
    Coaches,
    Media,
    TankOfTheWeek,
    ReplayOfTheWeek,
    Orders,
    Sessions,
  ],
  routes: {
    admin: "/admin",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- CoachingCentral",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
