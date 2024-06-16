import { useEffect, useState } from "react";

type ChatScrollProps = {
	chatRef: React.RefObject<HTMLDivElement>;
	bottomRef: React.RefObject<HTMLDivElement>;
	shouldLoadMore: boolean;
	loadMore: () => void;
	count: Number;
};

export const useChatScroll = (props: ChatScrollProps) => {
	const { chatRef, bottomRef, count, loadMore, shouldLoadMore } = props;

	const [hasInitialized, setHasInitialized] = useState(false);

	useEffect(() => {
		const topDiv = chatRef?.current;

		const handleScroll = () => {
			const scrollTop = topDiv?.scrollTop;

			if (scrollTop === 0 && shouldLoadMore) {
				loadMore();
			}
		};

		topDiv?.addEventListener("scroll", handleScroll);

		return () => topDiv?.removeEventListener("scroll", handleScroll);
	}, [shouldLoadMore, loadMore, chatRef]);

	useEffect(() => {
		const botomDiv = bottomRef?.current;

		const topDiv = chatRef.current;

		const shouldAutoScroll = () => {
			if (!hasInitialized && botomDiv) {
				setHasInitialized(true);
				return true;
			}

			if (!topDiv) {
				return false;
			}

			const distanceFromBottom =
				topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

			return distanceFromBottom <= 100;
		};

		if (shouldAutoScroll()) {
			setTimeout(() => {
				botomDiv?.scrollIntoView({ behavior: "smooth" });
			}, 100);
		}
	}, [count, chatRef, bottomRef, hasInitialized]);
};
