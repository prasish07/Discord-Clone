import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const UserAvatar = ({
	className,
	src,
}: {
	src?: string;
	className?: string;
}) => {
	return (
		<Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
			<AvatarImage src={src} alt="Profile" />
		</Avatar>
	);
};

export default UserAvatar;
