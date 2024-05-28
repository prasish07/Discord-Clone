import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const state = true;

const Home = () => {
	return (
		<p className="text-3xl">
			This is the initial page
			<Button>this is button</Button>
		</p>
	);
};

export default Home;
