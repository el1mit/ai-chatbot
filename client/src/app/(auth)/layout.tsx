// import Header from '@/components/Header';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto h-screen flex flex-col">
			{/* <Header /> */}
			<div className="grow flex items-center justify-center *:mb-48">
				{children}
			</div>
		</div>
	);
}
