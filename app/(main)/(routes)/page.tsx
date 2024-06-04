import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const state = true;

const Home = () => {
	return (
		<div className="flex flex-col gap-4">
			<UserButton afterSignOutUrl="/" />
			<ModeToggle />
		</div>
	);
};

export default Home;
