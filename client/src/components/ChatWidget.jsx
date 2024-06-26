'use client';

import { useState } from 'react';
import Chat from './Chat';
import ChatWidgetButton from './ChatWidgetButton';

export default function ChatWidget() {
	const [visible, setVisible] = useState(false);

	const handleOpenClick = () => {
		setVisible(!visible);
	};

	return (
		<div className="flex flex-col flex-nowrap items-end gap-2 fixed bottom-10 right-10">
			<Chat visible={visible} onClick={handleOpenClick} />
			<ChatWidgetButton onClick={handleOpenClick} />
		</div>
	);
}
