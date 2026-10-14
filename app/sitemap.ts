import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/vehicles";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getVehicles();
  return [
    ...["", "/fleet", "/services", "/about", "/contact"].map((p) => ({ url: site.url + p })),
    ...vehicles.map((v) => ({ url: `${site.url}/fleet/${v.slug}` })),
  ];
}
