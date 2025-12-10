import { useShare } from "@asap/ui/share-modal";
import { t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

export function useAppShare() {
	const { share: uiShare, ...rest } = useShare();
	const { i18n } = useLingui();

	const share = async (data: {
		type: "daily" | "weekly" | "monthly" | "custom";
		content?: string;
		extras?: string;
	}) => {
		const url = "https://whoroscope.getyourappasap.xyz";

		const typeNames = {
			daily: i18n._(t`daily`),
			weekly: i18n._(t`weekly`),
			monthly: i18n._(t`monthly`),
			custom: i18n._(t`custom`),
		};

		const prettyType = typeNames[data.type];
		const title = i18n._(t`✨ Whoroscope ✨`);

		const headline = i18n._(
			t`Check my ${prettyType} Whoroscope — get yours at ${url}!`,
		);

		const snippet = data.content
			? data.content
			: i18n._(t`Check my Whoroscope — it's faster than your ex.`);

		const shareText = `${headline}\n\n${data.extras ? `${data.extras}\n\n` : ""}${snippet}`;

		await uiShare({
			title,
			text: shareText,
			url,
			labels: {
				title: i18n._(t`Spill the Tea`),
				copied: i18n._(t`Link copied. Go spread the word.`),
			},
		});
	};
	return { share, ...rest };
}
