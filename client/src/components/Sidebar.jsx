'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, useDisclosure } from '@nextui-org/react';
import { CiEdit } from 'react-icons/ci';
import { CiTrash } from 'react-icons/ci';
import { CiSquareCheck } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuth } from '@/context/AuthContext';
import { deleteChat, renameChat } from '@/heplers/api';

export default function Sidebar({ chats }) {
	const auth = useAuth();

	const [isRenaming, setIsRenaming] = useState(false);
	const [title, setTitle] = useState('');

	const {
		isOpen: isLoginModalOpen,
		onOpen: onLoginModalOpen,
		onOpenChange: onLoginModalOpenChange,
	} = useDisclosure();

	const {
		isOpen: isSignupModalOpen,
		onOpen: onSignupModalOpen,
		onOpenChange: onSignupModalOpenChange,
	} = useDisclosure();

	const handleDeleteChat = async (chat_id) => {
		await deleteChat(chat_id);
		window.location.reload();
	};

	const handleRenameChat = async (chat_id) => {
		await renameChat(chat_id, title);
		window.location.reload();
	};

	return (
		<div className="flex flex-col justify-between grow w-[20vw]">
			<div
				className={`grow flex-col m-4 ${
					!auth.isLoggedIn && 'flex align-center justify-center'
				}`}
			>
				{auth.isLoggedIn && (
					<Link href="/chat">
						<Button className="w-full">New chat</Button>
					</Link>
				)}

				{auth.isLoggedIn ? (
					<div className="flex flex-col gap-2 mt-2">
						{chats?.map((chat) => (
							<div key={chat._id} className="grow flex flex-row gap-2">
								{isRenaming ? (
									<Input
										autoFocus
										name="title"
										value={title}
										onValueChange={setTitle}
										placeholder="Enter title"
										variant="bordered"
									/>
								) : (
									<Link className="w-full" href={`/chat/${chat._id}`}>
										<Button
											color="default"
											variant="ghost"
											className="w-full text-ellipsis block"
										>
											{chat.title}
										</Button>
									</Link>
								)}

								{isRenaming ? (
									<Button
										onPress={() => handleRenameChat(chat._id)}
										isIconOnly
										color="success"
										variant="light"
									>
										<CiSquareCheck />
									</Button>
								) : (
									<Button
										onPress={() => setIsRenaming(true)}
										isIconOnly
										color="warning"
										variant="light"
									>
										<CiEdit />
									</Button>
								)}

								{isRenaming ? (
									<Button
										onPress={() => setIsRenaming(false)}
										isIconOnly
										color="danger"
										variant="light"
									>
										<IoMdClose />
									</Button>
								) : (
									<Button
										onPress={() => handleDeleteChat(chat._id)}
										isIconOnly
										color="danger"
										variant="light"
									>
										<CiTrash />
									</Button>
								)}
							</div>
						))}
					</div>
				) : (
					<div className="text-center">
						You must <span className="italic">login/register</span> to access
						your chats history and create new chats
					</div>
				)}
			</div>

			{!auth.isLoggedIn ? (
				<div className="flex-none flex flex-col gap-2 m-4">
					<Button onPress={onLoginModalOpen} color="primary">
						Login
					</Button>
					<Button onPress={onSignupModalOpen}>Signup</Button>
					<LoginModal
						isOpen={isLoginModalOpen}
						onOpenChange={onLoginModalOpenChange}
					/>
					<SignupModal
						isOpen={isSignupModalOpen}
						onOpenChange={onSignupModalOpenChange}
					/>
				</div>
			) : (
				<div className="flex-none flex flex-col gap-2 m-4">
					<Button onPress={auth.logout} color="danger">
						Logout
					</Button>
				</div>
			)}
		</div>
	);
}
