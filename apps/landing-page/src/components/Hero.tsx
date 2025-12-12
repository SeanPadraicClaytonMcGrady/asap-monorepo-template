import { Star } from "lucide-react";
import type React from "react";

type HeroProps = {};

const Hero: React.FC<HeroProps> = () => {
	const goToApp = () => {
		window.location.href = process.env.NEXT_PUBLIC_BASE_URL as string;
	};
	return (
		<div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-200 mb-8 animate-float">
					<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
					<span className="text-sm font-semibold tracking-wide uppercase">
						Cosmic Unfiltered Insights
					</span>
				</div>

				<h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
					<span className="block text-white mb-2">The Horoscope That</span>
					<span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 pb-2">
						Doesn't Sugarcoat It
					</span>
				</h1>

				<p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
					Forget vanilla astrology. Whoroscope gives you the spicy, honest, and
					sometimes brutal truth about your cosmic mess. Are you ready to get
					dragged by the stars?
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					<button
						type="button"
						onClick={() => goToApp()}
						className="px-6 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg text-white hover:bg-white/10 transition-all w-auto flex justify-center items-center"
					>
						Get App
					</button>
				</div>

				{/* Decorative elements */}
				<div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
				<div className="absolute top-1/2 right-10 w-24 h-24 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
			</div>
		</div>
	);
};

export default Hero;
