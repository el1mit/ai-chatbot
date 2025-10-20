import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, CheckIcon, XIcon } from 'lucide-react';
// import { deleteChat, renameChat } from '@/api/chat';
// import { useQueryClient } from '@tanstack/react-query';

interface ChatItemProps {
	chat: {
		_id: string;
		title: string;
	};
}

export default function ChatItem({ chat }: ChatItemProps) {
	// const queryClient = useQueryClient();
	const [isRenaming, setIsRenaming] = useState(false);
	const [title, setTitle] = useState(chat.title);
	const [hovered, setHovered] = useState(false);

	// const handleDeleteChat = async (chat_id: number) => {
	// 	await deleteChat(chat_id);
	// 	queryClient.invalidateQueries({ queryKey: ['chats'] });
	// };

	// const handleRenameChat = async (chat_id : number) => {
	// 	await renameChat(chat_id, title);
	// 	queryClient.invalidateQueries({ queryKey: ['chats'] });
	// 	setIsRenaming(false);
	// };

	return (
		<div
			key={chat._id}
			className="flex gap-2 flex-row w-full"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{isRenaming ? (
				<Input
					autoFocus
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter title"
				/>
			) : (
				<Button
					asChild
					variant="outline"
					className="shrink w-full truncate block text-center"
				>
					<Link className="" href={`/chat/${chat._id}`}>
						{chat.title}
					</Link>
				</Button>
			)}

			{isRenaming ? (
				// <Button onClick={() => handleRenameChat(chat._id)}>
				<Button>
					<CheckIcon />
				</Button>
			) : (
				<Button
					className={hovered ? 'block' : 'hidden'}
					onClick={() => setIsRenaming(true)}
				>
					<Edit2 />
				</Button>
			)}

			{isRenaming ? (
				<Button onClick={() => setIsRenaming(false)} variant="destructive">
					<XIcon />
				</Button>
			) : (
				<Button className={hovered ? 'block' : 'hidden'} variant="destructive">
					<Trash2 />
				</Button>
			)}
		</div>
	);
}
