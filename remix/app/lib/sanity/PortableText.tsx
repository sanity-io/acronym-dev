import BlockContent from "@sanity/block-content-to-react";
import { client } from "~/lib/sanity/client";
//import serializers from "./serializers/index";

export const PortableText = ({ blocks }: { blocks: any }) => {
  return <BlockContent imageOptions={client} blocks={blocks} />;
};
