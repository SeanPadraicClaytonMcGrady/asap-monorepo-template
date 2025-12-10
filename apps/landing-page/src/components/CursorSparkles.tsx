import { useEffect, useRef } from "react";

const CursorSparkles = () => {
	const lastPos = useRef({ x: 0, y: 0 });
	const lastTime = useRef(0);

	useEffect(() => {
		// We append directly to body to avoid React render cycle overhead for high-frequency particles
		const container = document.body;

		const createSparkle = (x: number, y: number) => {
			const sparkle = document.createElement("div");
			sparkle.classList.add("cursor-sparkle");

			const size = Math.random() * 4 + 2; // 2-6px
			sparkle.style.width = `${size}px`;
			sparkle.style.height = `${size}px`;
			sparkle.style.left = `${x}px`;
			sparkle.style.top = `${y}px`;

			// Random cosmic colors: Pink, Purple, White, Cyan
			const colors = ["#ec4899", "#a855f7", "#ffffff", "#67e8f9"];
			sparkle.style.backgroundColor = colors[
				Math.floor(Math.random() * colors.length)
			] as string;

			// Random movement direction
			// tx: slight horizontal drift (-15px to +15px)
			// ty: gravity drop (20px to 70px)
			const tx = (Math.random() - 0.5) * 30;
			const ty = Math.random() * 50 + 20;

			sparkle.style.setProperty("--tx", `${tx}px`);
			sparkle.style.setProperty("--ty", `${ty}px`);

			container.appendChild(sparkle);

			// Cleanup after animation
			setTimeout(() => {
				if (sparkle.parentNode) {
					sparkle.parentNode.removeChild(sparkle);
				}
			}, 1000); // Matches CSS animation duration + buffer
		};

		const handleMouseMove = (e: MouseEvent) => {
			const now = Date.now();
			const dt = now - lastTime.current;
			const dx = e.clientX - lastPos.current.x;
			const dy = e.clientY - lastPos.current.y;

			// Calculate speed (pixels per ms)
			// Prevent division by zero if dt is 0
			const speed = dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0;

			lastPos.current = { x: e.clientX, y: e.clientY };
			lastTime.current = now;

			// Logic:
			// 1. Random chance on normal movement (creates trail)
			// 2. High chance if moving fast (creates burst)
			if (Math.random() < 0.2 || speed > 1.5) {
				createSparkle(e.clientX, e.clientY);
			}
		};

		const handleScroll = () => {
			// Spawn sparkles at last known cursor position when scrolling
			// Adds dynamic feel even if mouse is stationary
			if (Math.random() < 0.4) {
				createSparkle(lastPos.current.x, lastPos.current.y);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return null;
};

export default CursorSparkles;
