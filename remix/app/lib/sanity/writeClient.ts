import dotenv from "dotenv";
dotenv.config();
import { config } from "./config";
import sanityClient from "@sanity/client";

export const writeClient = sanityClient({
  ...config,
  token: process.env.SANITY_WRITE_TOKEN,
});
