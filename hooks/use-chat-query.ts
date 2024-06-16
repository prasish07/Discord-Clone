import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
	queryKey: string;
	apiUrl: string;
	paramKey: "channelId" | "conversationId";
	paramValue: string;
}

export const useChatQuery = (props: ChatQueryProps) => {
	const { apiUrl, paramKey, paramValue, queryKey } = props;

	const { isConnected } = useSocket();

	const fetchMessage = async ({ pageParam = undefined }) => {
		const url = qs.stringifyUrl(
			{
				url: apiUrl,
				query: {
					cursor: pageParam,
					[paramKey]: paramValue,
				},
			},
			{ skipNull: true }
		);

		const res = await fetch(url);
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}
		return res.json();
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: [queryKey],
			queryFn: fetchMessage,
			getNextPageParam: (lastPage) => lastPage?.nextCursor, // Correct parameter name
			refetchInterval: isConnected ? false : 1000,
			initialPageParam: undefined,
		});

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
	};
};
