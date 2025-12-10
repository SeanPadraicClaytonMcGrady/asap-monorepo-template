import { Flame, HeartCrack, Moon, Zap } from "lucide-react";

const features = [
	{
		icon: <Flame className="w-8 h-8 text-orange-500" />,
		title: "Daily Roast",
		description:
			"Start your morning with a reality check. We'll tell you exactly how you're going to mess up today.",
	},
	{
		icon: <HeartCrack className="w-8 h-8 text-pink-500" />,
		title: "Love & Lust",
		description:
			"Will they text back? Probably not. Find out why your love life is a chaotic disaster zone.",
	},
	{
		icon: <Zap className="w-8 h-8 text-yellow-400" />,
		title: "Toxic Compatibility",
		description:
			"Discover which signs you should absolutely avoid sleeping with (but probably will anyway).",
	},
	{
		icon: <Moon className="w-8 h-8 text-purple-400" />,
		title: "Monthly Meltdown",
		description:
			"A comprehensive look at the month ahead so you can schedule your mental breakdowns accordingly.",
	},
];

const Features = () => {
	return (
		<section id="features" className="py-20 relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-white mb-4">
						Why We're Different
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						Most astrology apps want to make you feel good. We want to make you
						feel seen. Even the ugly parts.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="glass-panel p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-default border border-white/5 hover:border-pink-500/30"
						>
							<div className="mb-6 p-4 rounded-full bg-white/5 inline-block group-hover:scale-110 transition-transform duration-300">
								{feature.icon}
							</div>
							<h3 className="text-xl font-bold text-white mb-3">
								{feature.title}
							</h3>
							<p className="text-gray-400 leading-relaxed text-sm">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
