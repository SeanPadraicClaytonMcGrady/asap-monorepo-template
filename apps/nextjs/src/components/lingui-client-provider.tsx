"use client";

import { i18n, type Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useState } from "react";

export function LinguiClientProvider({
	children,
	locale,
	messages,
}: {
	children: React.ReactNode;
	locale: string;
	messages: Messages;
}) {
	const [currentI18n] = useState(() => {
		i18n.load(locale, messages);
		i18n.activate(locale);
		return i18n;
	});

	// If locale changes dynamically (though usually we do full reload or router refresh)
	if (i18n.locale !== locale) {
		i18n.load(locale, messages);
		i18n.activate(locale);
	}

	return <I18nProvider i18n={currentI18n}>{children}</I18nProvider>;
}
