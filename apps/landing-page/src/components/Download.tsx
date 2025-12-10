import {
	Download as DownloadIcon,
	Monitor,
	MoreVertical,
	PlusSquare,
	Share,
	Smartphone,
} from "lucide-react";

const Download = () => {
	return (
		<div className="min-h-screen pt-32 pb-24 bg-[#090a0f]">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
						<Smartphone className="w-10 h-10 text-white" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Get Whoroscope on Mobile
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
						Why open a browser when you can have your daily roast one tap away?
						Install the Whoroscope PWA (Progressive Web App) for the full native
						experience.
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-gray-300">
							<Monitor size={16} /> <span>Works in Browser</span>
						</div>
						<div className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 rounded-full border border-pink-500/30 text-sm text-pink-300">
							<Smartphone size={16} /> <span>Installable as App</span>
						</div>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
					{/* iOS Section */}
					<div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
						<div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
							<div className="w-12 h-12 bg-[#1c1c1e] rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
								{/* Apple Icon */}
								<svg
									aria-labelledby="appleTitle"
									className="w-6 h-6 text-white fill-current"
									viewBox="0 0 24 24"
								>
									<title id="appleTitle">Apple</title>
									<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.08-3.11-1.04.05-2.29.69-3.02 1.55-.65.75-1.21 1.95-1.06 3.04 1.15.09 2.33-.64 3-1.48z" />
								</svg>
							</div>
							<div>
								<h2 className="text-2xl font-bold text-white">iOS</h2>
								<p className="text-gray-400 text-sm">iPhone & iPad</p>
							</div>
						</div>

						<div className="space-y-8 relative">
							<div className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-bold">
									1
								</div>
								<div>
									<p className="text-gray-300 mb-2">
										Open <strong>Safari</strong> and navigate to{" "}
										<span className="text-white font-medium">
											whoroscope.app
										</span>
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-bold">
									2
								</div>
								<div>
									<p className="text-gray-300 mb-3">
										Tap the <strong>Share</strong> button at the bottom bar.
									</p>
									<div className="bg-[#1c1c1e] p-4 rounded-xl border border-white/10 inline-block">
										<Share className="text-[#007AFF] w-6 h-6 mx-auto" />
									</div>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-bold">
									3
								</div>
								<div>
									<p className="text-gray-300 mb-3">
										Scroll down and tap <strong>'Add to Home Screen'</strong>.
									</p>
									<div className="bg-[#2c2c2e] w-full max-w-[200px] py-3 px-4 rounded-lg border border-white/5 flex items-center gap-3">
										<div className="bg-[#3a3a3c] p-1 rounded">
											<PlusSquare className="text-gray-400 w-4 h-4" />
										</div>
										<span className="text-white text-sm font-medium">
											Add to Home Screen
										</span>
									</div>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-bold">
									4
								</div>
								<div>
									<p className="text-gray-300">
										Tap <strong>Add</strong> in the top right corner.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Android Section */}
					<div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
						<div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
							<div className="w-12 h-12 bg-[#3DDC84] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-green-900/20">
								<svg
									aria-labelledby="androidtitle"
									className="w-7 h-7 text-black fill-current"
									viewBox="0 0 24 24"
								>
									<title id="androidTitle">Android</title>
									<path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1527-.5676.416.416 0 00-.5676.1527l-2.0225 3.503c-1.4655-.6723-3.1367-1.0476-4.8988-1.0476-1.7432 0-3.3957.3693-4.8524 1.0266l-2.0084-3.4816a.416.416 0 00-.5676-.1527.416.416 0 00-.1527.5676l1.9848 3.438C3.8966 10.8228 2.01 13.5683 2 16.666h20c-.01-3.1166-1.9145-5.88-4.8815-7.3446" />
								</svg>
							</div>
							<div>
								<h2 className="text-2xl font-bold text-white">Android</h2>
								<p className="text-gray-400 text-sm">Chrome & others</p>
							</div>
						</div>

						<div className="space-y-8">
							<div className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center font-bold">
									1
								</div>
								<div>
									<p className="text-gray-300 mb-2">
										Open <strong>Chrome</strong> and navigate to{" "}
										<span className="text-white font-medium">
											whoroscope.app
										</span>
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center font-bold">
									2
								</div>
								<div>
									<p className="text-gray-300 mb-3">
										Tap the <strong>Menu</strong> icon (three dots) at the top
										right.
									</p>
									<div className="bg-[#1c1c1e] p-4 rounded-xl border border-white/10 inline-block">
										<MoreVertical className="text-gray-400 w-6 h-6 mx-auto" />
									</div>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center font-bold">
									3
								</div>
								<div>
									<p className="text-gray-300 mb-3">
										Tap <strong>'Install App'</strong> or{" "}
										<strong>'Add to Home screen'</strong>.
									</p>
									<div className="bg-[#2c2c2e] w-full max-w-[200px] py-3 px-4 rounded-lg border border-white/5 flex items-center gap-3">
										<DownloadIcon className="text-gray-400 w-4 h-4" />
										<span className="text-white text-sm font-medium">
											Install App
										</span>
									</div>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center font-bold">
									4
								</div>
								<div>
									<p className="text-gray-300">
										Follow the on-screen prompts to install.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Download;
