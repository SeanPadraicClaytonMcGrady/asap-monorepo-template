"use client";

import { Button } from "@asap/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@asap/ui/dropdown-menu";
import { useLingui } from "@lingui/react";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";

const languages = {
	en: "English",
	fr: "Français",
	es: "Español",
};

export function LanguageSwitcher() {
	const { i18n } = useLingui();
	const router = useRouter();

	const handleLanguageChange = (locale: string) => {
		document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`; // 1 year
		router.refresh();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="w-9 px-0">
					<Languages className="h-4 w-4" />
					<span className="sr-only">Switch Language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{Object.entries(languages).map(([locale, label]) => (
					<DropdownMenuItem
						key={locale}
						onClick={() => handleLanguageChange(locale)}
						className={i18n.locale === locale ? "bg-accent" : ""}
					>
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
