import { Button } from '@/components/ui/button';

export default function ChatWidgetButton({ onClick }: { onClick: () => void }) {
	return <Button onClick={onClick}>Chat Widget</Button>;
}
