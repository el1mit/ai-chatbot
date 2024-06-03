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
import { CiMail } from 'react-icons/ci';
import { CiUser } from 'react-icons/ci';
import { CiLock } from 'react-icons/ci';
import { useAuth } from '@/context/AuthContext';

export default function SignupModal({ isOpen, onOpenChange }) {
	const auth = useAuth();

	const handleSubmit = async (e, onClose) => {
		e.preventDefault();
		const formdata = new FormData(e.currentTarget);
		const login = formdata.get('login');
		const password = formdata.get('password');
		const email = formdata.get('email');
		await auth.signup(login, email, password);

		console.log(auth.user);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
			<ModalContent>
				{(onClose) => (
					<form onSubmit={(e) => handleSubmit(e, onClose)}>
						<ModalHeader className="flex flex-col gap-1">Signup</ModalHeader>
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
									<CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
								}
								label="Email"
								name="email"
								placeholder="Enter your email"
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
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="flat" onPress={onClose}>
								Close
							</Button>
							<Button color="primary" type="submit">
								Signup
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
}
