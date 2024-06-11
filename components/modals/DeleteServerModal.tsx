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
import { useRouter } from "next/navigation";

const DeleteServerModal = () => {
	const { isOpen, onClose, type, data, onOpen } = useModal();

	const isModalOpen = isOpen && type == "deleteServer";
	const { server } = data;
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const deleteServer = async () => {
		try {
			setIsLoading(true);
			await axios.delete(`/api/servers/${server?.id}`);
			setIsLoading(false);
			onClose();
			router.refresh();
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
						Delete Server
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500">
						Are you sure you want to Delete this{" "}
						<span className="font-semibold text-indigo-500">
							{server?.name}
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
							onClick={deleteServer}
						>
							Confirm
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteServerModal;