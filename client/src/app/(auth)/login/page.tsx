'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
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
import { loginUser } from '@/api/auth';

export default function LoginPage() {
	const { setUser } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const onSubmit = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		try {
			console.log({ email, password });
			const response = await loginUser(email, password);
			console.log(response);
			if (response) {
				setUser(response);
				router.push('/');
			}
		} catch (error: unknown) {
			// setError(error.message);
			if (error instanceof Error) {
				setError(error.message);
			} else if (typeof error === 'string') {
				setError(`Caught a string error: ${error}`);
			} else {
				setError(`An unknown error occurred:${error}`);
			}
		}
		router.push('/');
	};

	return (
		<Card className="w-1/3 h-max">
			<CardHeader>
				<CardTitle className="text-xl">Login to your account</CardTitle>
				<CardDescription>
					<p className="text-red-500">{error}</p>
					Enter your email and password in the form below to access your account
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent>
				<form className="flex flex-col gap-4">
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
				</form>
			</CardContent>
			<Separator />
			<CardFooter className="flex justify-between">
				<Button asChild variant="outline">
					<Link href="/">Cancel</Link>
				</Button>
				<Button type="submit" onClick={onSubmit}>
					Login
				</Button>
			</CardFooter>
		</Card>
	);
}
