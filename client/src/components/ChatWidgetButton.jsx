'use client';

import { Button } from '@nextui-org/react';

export default function ChatWidgetButton({ onClick }) {
	return (
		<Button className="w-max" onClick={onClick}>
			Chat Widget
		</Button>
	);
}
