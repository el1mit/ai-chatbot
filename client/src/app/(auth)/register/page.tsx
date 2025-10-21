'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
// import { signupUser } from '@/api/auth';

export default function RegisterPage() {
	// const { setUser } = useAuth();
	const [login, setLogin] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const onSubmit = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		// try {
		// 	if (password !== confirmPassword) {
		// 		setError('Passwords do not match');
		// 		return;
		// 	}
		// 	const response = await signupUser(login, email, password);

		// 	if (response) {
		// 		setUser(response);
		// 		router.push('/');
		// 	}
		// } catch (error) {
		// 	setError(error.message);
		// }
		router.push('/');
	};

	return (
		<Card className="w-1/3 h-max">
			<CardHeader>
				<CardTitle className="text-xl">Create new account</CardTitle>
				<CardDescription>
					<p className="text-red-500">{error}</p>
					Fill up the form below to create new account
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent>
				<form className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="login">Login</Label>
						<Input
							id="login"
							placeholder="Login"
							value={login}
							onChange={(e) => setLogin(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
				</form>
			</CardContent>
			<Separator />
			<CardFooter className="flex justify-between">
				<Button asChild variant="outline">
					<Link href="/">Cancel</Link>
				</Button>
				<Button type="submit" onClick={onSubmit}>
					Register
				</Button>
			</CardFooter>
		</Card>
	);
}
