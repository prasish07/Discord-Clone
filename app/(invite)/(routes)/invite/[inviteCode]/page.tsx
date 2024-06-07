import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface InviteCodePageProps {
	params: {
		inviteCode: string;
	};
}

const InvitePage = async (props: InviteCodePageProps) => {
	const { inviteCode } = props?.params;

	await initialProfile();

	const profile = await currentProfile();

	if (!profile) {
		return auth().redirectToSignIn();
	}

	if (!inviteCode) {
		return redirect("/");
	}

	const existingServer = await db.server.findFirst({
		where: {
			inviteCode: inviteCode,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});

	if (existingServer) {
		return redirect(`/servers/${existingServer.id}`);
	}

	const server = await db.server.update({
		where: {
			inviteCode: inviteCode,
		},
		data: {
			members: {
				create: [
					{
						profileId: profile.id,
					},
				],
			},
		},
	});

	if (server) {
		return redirect(`/servers/${server.id}`);
	}

	return null;
};

export default InvitePage;
