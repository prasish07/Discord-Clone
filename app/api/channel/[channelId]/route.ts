import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{ params }: { params: { channelId: string } }
) {
	try {
		const profile = await currentProfile();
		const { searchParams } = new URL(req.url);
		const serverId = searchParams.get("serverId");
		const { channelId } = params;

		if (!profile) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!serverId) {
			return new NextResponse("Server Id Missing", { status: 400 });
		}

		const server = await db.server.update({
			where: {
				id: serverId,
				members: {
					some: {
						profileId: profile.id,
						role: {
							in: [MemberRole.ADMIN, MemberRole.MODERATOR],
						},
					},
				},
			},
			data: {
				channels: {
					delete: {
						id: channelId,
						name: {
							not: "general",
						},
					},
				},
			},
		});

		return NextResponse.json({ server });
	} catch (error) {
		console.log("delete_Server", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { channelId: string } }
) {
	try {
		const profile = await currentProfile();
		const { searchParams } = new URL(req.url);
		const serverId = searchParams.get("serverId");
		const { channelId } = params;
		const { name, type } = await req.json();

		if (!profile) {
			return new NextResponse("Profile not found", { status: 400 });
		}

		if (!serverId) {
			return new NextResponse("Server Id Missing", { status: 400 });
		}

		if (!channelId) {
			return new NextResponse("Channel Id Missing", { status: 400 });
		}

		const server = await db.server.update({
			where: {
				id: serverId,
				members: {
					some: {
						profileId: profile.id,
						role: {
							in: [MemberRole.ADMIN, MemberRole.MODERATOR],
						},
					},
				},
			},
			data: {
				channels: {
					update: {
						where: {
							id: channelId,
							NOT: {
								name: "general",
							},
						},
						data: {
							name,
							type,
						},
					},
				},
			},
		});

		return NextResponse.json({ server });
	} catch (error) {
		console.log("Channel_Patch", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
