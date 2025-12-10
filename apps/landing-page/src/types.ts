import type React from "react";

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	category: string;
	signs?: ZodiacSign[];
}

export enum ZodiacSign {
	Aries = "Aries",
	Taurus = "Taurus",
	Gemini = "Gemini",
	Cancer = "Cancer",
	Leo = "Leo",
	Virgo = "Virgo",
	Libra = "Libra",
	Scorpio = "Scorpio",
	Sagittarius = "Sagittarius",
	Capricorn = "Capricorn",
	Aquarius = "Aquarius",
	Pisces = "Pisces",
}

export interface SocialLink {
	platform: string;
	url: string;
	icon: React.ReactNode;
}
