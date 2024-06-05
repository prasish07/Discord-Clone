"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import React from "react";

interface ServerHeaderProps {
	server: ServerWithMembersWithProfiles;
	role?: MemberRole;
}

const ServerHeader = (props: ServerHeaderProps) => {
	const { server, role } = props;

	return <div></div>;
};

export default ServerHeader;
