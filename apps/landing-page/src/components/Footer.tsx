import { Instagram, Sparkles, Youtube } from "lucide-react";
import type React from "react";

interface FooterProps {
	onNavigate?: (page: "privacy" | "terms") => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
	// Custom SVG for TikTok since Lucide doesn't have it in all versions perfectly
	const TikTokIcon = () => (
		<svg
			aria-labelledby="tikTokIconTitle"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-5 h-5"
		>
			<title id="tikTokIconTitle">TikTok</title>
			<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
		</svg>
	);

	const PinterestIcon = () => (
		<svg
			aria-labelledby="pinterestIconTitle"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-5 h-5"
		>
			<title id="pinterestIconTitle">Pinterest</title>
			<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
		</svg>
	);

	return (
		<footer className="bg-[#090a0f] border-t border-white/10 pt-16 pb-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
					{/* Left Side */}
					<div className="md:max-w-md">
						{/* Logo */}
						<div className="flex items-center mb-6">
							<div className="bg-gradient-to-tr from-pink-500 to-purple-600 p-2 rounded-full mr-3">
								<Sparkles className="h-6 w-6 text-white" />
							</div>
							<span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
								Whoroscope
							</span>
						</div>

						<p className="text-gray-400 max-w-sm mb-6">
							The only horoscope app that tells you the truth, even when it
							hurts. Especially when it hurts.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://www.instagram.com/whoroscope.app/"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-pink-500 hover:bg-white/10 transition-all"
							>
								<Instagram size={20} />
							</a>
							<a
								href="https://www.tiktok.com/@whoroscope.app"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-pink-500 hover:bg-white/10 transition-all"
							>
								<TikTokIcon />
							</a>
							<a
								href="https://www.pinterest.com/whoroscopeapp/"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-pink-500 hover:bg-white/10 transition-all"
							>
								<PinterestIcon />
							</a>
							{/* <a
								href="#"
								className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-white/10 transition-all"
							>
								<Facebook size={20} />
							</a> */}
							<a
								href="https://www.youtube.com/@whoroscope-app"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/10 transition-all"
							>
								<Youtube size={20} />
							</a>
						</div>
					</div>

					{/* Right Side - Legal Only */}
					<div className="md:w-auto md:mt-16">
						<h4 className="text-white font-bold mb-4">Legal</h4>
						<ul className="space-y-2 text-gray-400 text-sm">
							<li>
								<button
									type="button"
									onClick={() => onNavigate?.("privacy")}
									className="hover:text-pink-400 transition-colors text-left"
								>
									Privacy Policy
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() => onNavigate?.("terms")}
									className="hover:text-pink-400 transition-colors text-left"
								>
									Terms of Service
								</button>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
					<p>
						&copy; {new Date().getFullYear()} Whoroscope. All rights reserved.
					</p>
					<p className="mt-2 md:mt-0">Made with ❤️ and 🌶️ by ASAP.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
