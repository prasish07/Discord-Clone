import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const profile = await currentProfile();

		const serverId = params.serverId;

		if (!profile) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!serverId) {
			return new NextResponse("Server not found", { status: 404 });
		}

		const server = await db.server.update({
			where: {
				id: serverId,
				profileId: {
					not: profile.id,
				},
				members: {
					some: {
						profileId: profile.id,
					},
				},
			},
			data: {
				members: {
					deleteMany: {
						profileId: profile.id,
					},
				},
			},
		});

		return NextResponse.json(server);
	} catch (error) {
		console.log("Server_Leave_Patch", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
