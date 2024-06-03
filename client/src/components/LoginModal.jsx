'use client';

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Link,
} from '@nextui-org/react';
import { CiUser } from 'react-icons/ci';
import { CiLock } from 'react-icons/ci';
import { useAuth } from '@/context/AuthContext';

export default function LoginModal({ isOpen, onOpenChange }) {
	const auth = useAuth();

	const handleSubmit = async (e, onClose) => {
		e.preventDefault();
		const formdata = new FormData(e.currentTarget);
		const login = formdata.get('login');
		const password = formdata.get('password');
		await auth.login(login, password);

		console.log(auth.user);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
			<ModalContent>
				{(onClose) => (
					<form onSubmit={(e) => handleSubmit(e, onClose)}>
						<ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
						<ModalBody>
							<Input
								autoFocus
								endContent={
									<CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
								}
								label="Login"
								name="login"
								placeholder="Enter your login"
								variant="bordered"
							/>
							<Input
								endContent={
									<CiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
								}
								label="Password"
								name="password"
								placeholder="Enter your password"
								type="password"
								variant="bordered"
							/>
							<div className="flex py-2 px-1 justify-end">
								<Link color="primary" href="#" size="sm">
									Forgot password?
								</Link>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="flat" onPress={onClose}>
								Close
							</Button>
							<Button color="primary" type="submit">
								Login
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
}
