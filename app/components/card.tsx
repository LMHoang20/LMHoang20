"use client";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
	glowColor?: string;
	disableGlow?: boolean;
	staticGlow?: boolean;
}

export const Card: React.FC<CardProps> = ({
	children,
	glowColor = "from-zinc-100/10 via-zinc-100/5 to-transparent",
	disableGlow = false,
	staticGlow = false,
}) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		if (disableGlow || staticGlow) return;
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	function onMouseLeave({ currentTarget }: any) {
		if (disableGlow || staticGlow) return;
		mouseX.set(0);
		mouseY.set(0);
	}

	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const staticMaskImage =
		"radial-gradient(240px at 0px 0px, white, transparent)";
	const dynamicStyle = { maskImage, WebkitMaskImage: maskImage };
	const staticStyle = {
		maskImage: staticMaskImage,
		WebkitMaskImage: staticMaskImage,
	};

	return (
		<div
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 "
		>
			{!disableGlow && (
				<div className="pointer-events-none">
					<div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
					{staticGlow ? (
						<>
							<div
								className={`absolute inset-0 z-10 bg-gradient-to-br opacity-100 transition duration-1000 group-hover:opacity-50 ${glowColor}`}
								style={staticStyle}
							/>
							<div
								className={`absolute inset-0 z-10 opacity-0 bg-gradient-to-br mix-blend-overlay transition duration-1000 group-hover:opacity-100 ${glowColor}`}
								style={staticStyle}
							/>
						</>
					) : (
						<>
							<motion.div
								className={`absolute inset-0 z-10 bg-gradient-to-br opacity-100 transition duration-1000 group-hover:opacity-50 ${glowColor}`}
								style={dynamicStyle}
							/>
							<motion.div
								className={`absolute inset-0 z-10 opacity-0 bg-gradient-to-br mix-blend-overlay transition duration-1000 group-hover:opacity-100 ${glowColor}`}
								style={dynamicStyle}
							/>
						</>
					)}
				</div>
			)}

			{children}
		</div>
	);
};
