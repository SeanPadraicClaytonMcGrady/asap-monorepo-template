"use client";

import { useState } from "react";
import Contact from "../components/Contact";
import CursorSparkles from "../components/CursorSparkles";
import Download from "../components/Download";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsOfService from "../components/TermsOfService";

const LandingPage = () => {
	const [currentView, setCurrentView] = useState<
		"home" | "shop" | "download" | "privacy" | "terms"
	>("home");

	const navigateTo = (
		view: "home" | "shop" | "download" | "privacy" | "terms",
	) => {
		setCurrentView(view);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="min-h-screen selection:bg-pink-500 selection:text-white">
			<CursorSparkles />

			{/* Main Navigation */}

			<main>
				{currentView === "home" ? (
					<>
						{/* Landing Page Content */}
						<Hero
						// onGetReading={() => setIsGeneratorOpen(true)}
						// onDownload={() => navigateTo("download")}
						/>
						<Features />
						{/* Shop Preview - Commented out for now
            <Shop viewMode="preview" onNavigate={() => navigateTo('shop')} />
            */}
						<Contact />
					</>
				) : currentView === "shop" ? (
					<>
						{/* Full Shop Page - Commented out access
            <div className="pt-20">
              <Shop viewMode="full" onNavigate={() => navigateTo('home')} />
            </div>
            */}
						{/* Fallback to home if shop is disabled but url state persists */}
						<div className="pt-40 text-center">
							<h2 className="text-2xl text-white">
								The shop is currently closed for cosmic realignment.
							</h2>
							<button
								type="button"
								onClick={() => navigateTo("home")}
								className="mt-4 text-pink-400 underline"
							>
								Return Home
							</button>
						</div>
					</>
				) : currentView === "download" ? (
					<>
						{/* Download Page */}
						<Download />
					</>
				) : currentView === "terms" ? (
					<>
						{/* Terms of Service Page */}
						<TermsOfService />
					</>
				) : currentView === "privacy" ? (
					<>
						{/* Privacy Policy Page */}
						<PrivacyPolicy />
					</>
				) : null}
			</main>

			{/* Footer */}
			<Footer onNavigate={navigateTo} />
		</div>
	);
};

export default LandingPage;
