const PrivacyPolicy = () => {
	return (
		<div className="min-h-screen pt-32 pb-24 bg-[#090a0f]">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
					<p className="text-gray-400">Last updated: December 05, 2025</p>
				</div>

				<div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 text-gray-300">
					<section>
						<h2 className="text-2xl font-bold text-white mb-4">
							1. Introduction
						</h2>
						<p>
							Welcome to Whoroscope. We are committed to protecting your
							personal information and your right to privacy. If you have any
							questions or concerns about our policy, or our practices with
							regards to your personal information, please contact us.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold text-white mb-4">
							2. Information We Collect
						</h2>
						<p className="mb-4">
							We collect personal information that you voluntarily provide to us
							when you register on the Services, express an interest in
							obtaining information about us or our products and Services, when
							you participate in activities on the Services, or otherwise when
							you contact us.
						</p>
						<ul className="list-disc list-inside space-y-2 pl-4">
							<li>Personal Data: Name, email address, contact data.</li>
							<li>
								Derivative Data: IP address, browser type, operating system,
								access times.
							</li>
							<li>
								Financial Data: Data related to your payment method (we do not
								store full credit card numbers).
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-bold text-white mb-4">
							3. How We Use Your Information
						</h2>
						<p>
							We use personal information collected via our Services for a
							variety of business purposes described below. We process your
							personal information for these purposes in reliance on our
							legitimate business interests, in order to enter into or perform a
							contract with you, with your consent, and/or for compliance with
							our legal obligations.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold text-white mb-4">
							4. Sharing Your Information
						</h2>
						<p>
							We only share information with your consent, to comply with laws,
							to provide you with services, to protect your rights, or to
							fulfill business obligations. We may process or share your data
							that we hold based on the following legal basis: Consent,
							Legitimate Interests, Performance of a Contract, Legal
							Obligations, and Vital Interests.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold text-white mb-4">
							5. Contact Us
						</h2>
						<p>
							If you have questions or comments about this policy, you may email
							us at getyourappasap@gmail.com or by post to:
						</p>
						<address className="mt-4 not-italic">
							Sean Padraic Clayton McGrady
							<br />
							2501 SW I Avenue
							<br />
							Lawton, OK 73505
							<br />
							United States
						</address>
					</section>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
