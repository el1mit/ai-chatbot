'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ChatItem from '@/components/ChatItem';
// import { useAuth } from '@/context/authContext';
// import { logoutUser } from '@/api/auth';

interface SidebarProps {
	chats: Array<{
		_id: string;
		title: string;
	}>;
	status: 'loading' | 'error' | 'success';
}

export default function Sidebar({ chats, status }: SidebarProps) {
	// const { user, setUser, userLoading } = useAuth();
	const { user, setUser, userLoading } = {
		user: true,
		setUser: () => {},
		userLoading: false,
	}; // Placeholder
	const router = useRouter();
	let content;

	// const handleLogout = async () => {
	// 	await logoutUser();
	// 	setUser(null);
	// 	router.push('/chat');
	// };

	if (status === 'loading') content = <div>Loading Chats...</div>;
	if (status === 'error') content = <div>Error while loading chats</div>;
	if (status === 'success')
		content = (
			<div className="flex flex-col gap-2 w-full ">
				{chats?.map((chat) => (
					<div key={chat._id}>
						<ChatItem chat={chat} />
						<Separator className="mt-2" />
					</div>
				))}
			</div>
		);

	return (
		<div className="flex flex-col justify-between w-[20vw] min-h-full">
			<div
				className={`flex-col m-4 ${
					!user && !userLoading && 'flex grow-1 align-center justify-center'
				}`}
			>
				{user && !userLoading && (
					<Button asChild className="w-full">
						<Link href="/chat">New chat</Link>
					</Button>
				)}

				{user && !userLoading ? (
					<div className="h-[73vh] overflow-auto mt-10">{content}</div>
				) : (
					<div className="text-center">
						You must <span className="italic">login/register</span> to access
						your chats history and create new chats
					</div>
				)}
			</div>

			<div className="flex-none flex flex-col gap-2 m-4">
				{user && !userLoading ? (
					<Button variant="destructive">Logout</Button>
				) : (
					<>
						<Button asChild>
							<Link href="/login">Login</Link>
						</Button>
						<Button asChild>
							<Link href="/register">Signup</Link>
						</Button>
					</>
				)}

				<Button asChild className="w-full">
					<Link href="/">Back to shop</Link>
				</Button>
			</div>
		</div>
	);
}
