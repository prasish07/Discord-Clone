"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";

const DeleteChannelModal = () => {
	const { isOpen, onClose, type, data, onOpen } = useModal();

	const isModalOpen = isOpen && type == "deleteChannel";
	const { server, channel } = data;
	const router = useRouter();
	const params = useParams();

	const [isLoading, setIsLoading] = useState(false);

	const deleteChannel = async () => {
		try {
			setIsLoading(true);
			const url = qs.stringifyUrl({
				url: `/api/channel/${channel?.id}`,
				query: {
					serverId: params?.serverId,
				},
			});
			await axios.delete(url);
			router.refresh();
			onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Delete Channel
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500">
						Are you sure you want to Delete this{" "}
						<span className="font-semibold text-indigo-500">
							#{channel?.name}
						</span>{" "}
						server?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="bg-gray-100 px-6 py-4">
					<div className="flex gap-4 items-center justify-between w-full">
						<Button
							variant="ghost"
							disabled={isLoading}
							className="w-full"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							disabled={isLoading}
							variant="primary"
							className="w-full"
							onClick={deleteChannel}
						>
							Confirm
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteChannelModal;
