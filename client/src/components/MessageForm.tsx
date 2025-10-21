'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type MessageFormProps = {
	message: string;
	setMessage: (message: string) => void;
	handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
	disabled?: boolean;
};

export default function MessageForm({
	message,
	setMessage,
	handleSubmit,
	disabled,
}: MessageFormProps) {
	return (
		<div className="flex flex-row justify-center items-center gap-2 m-4 w-full">
			<Textarea
				disabled={disabled}
				value={message}
				className="resize-none min-h-full max-h-20 break-all"
				onChange={(e) => setMessage(e.target.value)}
			/>
			<Button disabled={disabled} onClick={handleSubmit}>
				Send
			</Button>
		</div>
	);
}
