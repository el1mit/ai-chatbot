// import Header from '@/components/Header';
// import ChatWidget from '@/components/ChatWidget';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto">
			{/* <Header /> */}
			{children}
			{/* <ChatWidget /> */}
		</div>
	);
}
