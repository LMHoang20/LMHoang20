"use client";
import { Github, Mail, Linkedin, File } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { RecruiterForm } from "../components/recruiter-form";
import LeetCode from "../../public/leetcode.svg";
import Codeforces from "../../public/codeforces.svg";

const socials = [
	{
		icon: <Linkedin size={20} />,
		href: "https://linkedin.com/in/lmhoang20",
		label: "LinkedIn",
		handle: "lmhoang20",
		glowColor: "from-blue-500/20 via-blue-400/10 to-transparent",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/LMHoang20",
		label: "Github",
		handle: "LMHoang20",
		glowColor: "from-purple-500/20 via-purple-400/10 to-transparent",
	},
	{
		icon: <Codeforces width={20} height={20} />,
		href: "https://codeforces.com/profile/Narutobaco",
		label: "Codeforces (Purple)",
		handle: "Narutobaco",
		glowColor: "from-orange-500/20 via-orange-400/10 to-transparent",
	},
	{
		icon: <LeetCode width={20} height={20} />,
		href: "https://leetcode.com/u/LMHoang1312/",
		label: "LeetCode (Guardian)",
		handle: "LMHoang1312",
		glowColor: "from-yellow-500/20 via-yellow-400/10 to-transparent",
	},
];

export default function Example() {
	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container px-4 mx-auto">
				<div className="flex items-center justify-center min-h-screen">
					<div className="w-full max-w-6xl mx-auto mt-24 mb-16">
						<div className="text-center mb-16 mt-32 sm:mt-0">
							<h1 className="text-4xl md:text-6xl font-bold text-zinc-200 mb-4">
								Let's Connect
							</h1>
							<p className="text-lg text-zinc-400 max-w-2xl mx-auto">
								Whether you're a recruiter with exciting opportunities or just
								want to connect, I'm always open to meaningful conversations.
							</p>
						</div>

						{/* Two Column Layout */}
						<div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
							{/* Social Links Section */}
							<div>
								<h2 className="text-2xl font-bold text-zinc-200 mb-8 text-center xl:text-left">
									Find Me Online
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									{socials.map((s, index) => (
										<Card key={index} glowColor={s.glowColor}>
											<Link
												href={s.href}
												target="_blank"
												className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-6 md:py-16 md:p-8"
											>
												<span
													className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
													aria-hidden="true"
												/>
												<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
													{s.icon}
												</span>
												<div className="z-10 flex flex-col items-center">
													<span className="text-lg font-medium duration-150 text-zinc-200 group-hover:text-white font-display">
														{s.handle}
													</span>
													<span className="mt-2 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
														{s.label}
													</span>
												</div>
											</Link>
										</Card>
									))}
								</div>
							</div>

							{/* Recruiter Form Section */}
							<div>
								<h2 className="text-2xl font-bold text-zinc-200 mb-8 text-center xl:text-left">
									For Recruiters & Opportunities
								</h2>
								<RecruiterForm />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
