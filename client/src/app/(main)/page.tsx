'use client';
// import ProductsList from '@/components/ProductsList';
// import { useQuery } from '@tanstack/react-query';
// import { getAllProducts } from '@/api/products';
// import ProductsListSkeleton from '@/components/ProductsListSkeleton';

export default function Home() {
	// const { isLoading, isError, data, error } = useQuery({
	// 	queryKey: ['products'],
	// 	queryFn: getAllProducts,
	// });
	// console.log(data);

	// if (isLoading) {
	// 	return <ProductsListSkeleton />;
	// }

	// if (isError) {
	// 	return <div>{error.message}</div>;
	// }

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Welcome to the AI Chatbot</h1>
			{/* <ProductsList products={data} /> */}
		</div>
	);
}
