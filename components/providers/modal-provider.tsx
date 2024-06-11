"use client";

import CreateServerModal from "@/components/modals/CreateServerModal";
import { useEffect, useState } from "react";
import InviteModal from "../modals/InviteModal";
import EditServerModal from "../modals/EditServerModal";
import MemberModal from "../modals/MemberModal";
import CreateChannelModal from "../modals/CreateChannelModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import DeleteServerModal from "../modals/DeleteServerModal";
import DeleteChannelModal from "../modals/DeleteChannelModal";
import EditChannelModal from "../modals/EditChannelModal";

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<CreateServerModal />
			<InviteModal />
			<EditServerModal />
			<MemberModal />
			<CreateChannelModal />
			<LeaveServerModal />
			<DeleteServerModal />
			<DeleteChannelModal />
			<EditChannelModal />
		</>
	);
};
