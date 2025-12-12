import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Template Name",
		short_name: "Template",
		description: "Describe your app here",
		start_url: "/",
		display: "standalone",
		background_color: "#2e1065", // purple-950
		theme_color: "#2e1065",
		icons: [
			{
				src: "/template-icon-192x.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/template-icon-512x.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
