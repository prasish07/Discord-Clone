import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{
		params,
	}: {
		params: { serverId: string };
	}
) {
	try {
		const profile = await currentProfile();

		const { name, imageUrl } = await req.json();

		if (!profile) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!params) {
			return new NextResponse("Server Id Missing", { status: 400 });
		}

		const server = await db.server.update({
			where: {
				id: params.serverId,
			},
			data: {
				name,
				imageUrl,
			},
		});

		if (!server) {
			return new NextResponse("Server Not Found", { status: 404 });
		}

		return NextResponse.json(server);
	} catch (error) {
		console.log("[Server_id]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
