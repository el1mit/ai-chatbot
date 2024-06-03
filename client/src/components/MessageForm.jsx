'use client';

import { Input, Button } from '@nextui-org/react';

export default function MessageForm({
	message,
	setMessage,
	handleSubmit,
	disabled,
}) {
	return (
		<div className="flex flex-row justify-center items-center gap-2 m-4 w-full">
			<Input
				disabled={disabled}
				fullWidth={false}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<Button disabled={disabled} onClick={handleSubmit}>
				Send
			</Button>
		</div>
	);
}
