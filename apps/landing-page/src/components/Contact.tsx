import { Send } from "lucide-react";
import type React from "react";
import { useState } from "react";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		reason: "General inquiry",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const { name, email, reason, message } = formData;

		// Construct email body
		const subject = `[${reason}] Contact from ${name || "User"}`;
		const body = `Name: ${name}\nEmail: ${email}\nReason: ${reason}\n\nMessage:\n${message}`;

		// Open default mail client
		window.location.href = `mailto:whoroscope.app@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	};

	return (
		<section id="contact" className="py-20">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl shadow-purple-900/20">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold text-white mb-4">
							Spill The Tea
						</h2>
						<p className="text-gray-400">
							Got feedback? Found a bug? Just want to vent? We're reading.
						</p>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									value={formData.name}
									onChange={handleChange}
									className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
									placeholder="Your name"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
									placeholder="cosmic@universe.com"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="reason"
								className="block text-sm font-medium text-gray-300 mb-2"
							>
								What's this about?
							</label>
							<select
								id="reason"
								value={formData.reason}
								onChange={handleChange}
								className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
								style={{ colorScheme: "dark" }}
							>
								<option value="General inquiry" className="bg-[#1a0b2e]">
									General inquiry
								</option>
								<option value="Support" className="bg-[#1a0b2e]">
									Support
								</option>
								<option value="Partnership" className="bg-[#1a0b2e]">
									Partnership
								</option>
								<option value="Feature request" className="bg-[#1a0b2e]">
									Feature request
								</option>
							</select>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-300 mb-2"
							>
								Message
							</label>
							<textarea
								id="message"
								rows={4}
								value={formData.message}
								onChange={handleChange}
								className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
								placeholder="Tell us what's on your mind..."
							></textarea>
						</div>

						<button
							type="submit"
							className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-lg shadow-lg transform transition-all hover:scale-[1.02] flex justify-center items-center gap-2"
						>
							Send Message <Send size={18} />
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;
