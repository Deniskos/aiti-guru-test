import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
	fetchProducts,
	setPage,
	setSearchMode,
} from "@/features/productsSlice";
import { Pagination } from "@/shared/ui/Pagination";

import { addProduct } from "@/features/productsSlice";
import { showToast } from "@/shared/lib/toast";
import { AddProductModal } from "./components/AddProductModal";

import { Title } from "@/shared/ui/Title";
import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { ProductsList } from "./components/ProductsList";
import { TableHead } from "./components/TableHead";
import type { CreateProductDto } from "./model/types";

export const Products = () => {
	const dispatch = useAppDispatch();
	const { page, limit, total, sortBy, order } = useAppSelector(
		(state) => state.products,
	);

	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState<string>("");

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!debouncedQuery) {
			dispatch(setPage(page));
			dispatch(fetchProducts());
		} else {
			// dispatch(setPage(1));
			dispatch(fetchProducts(debouncedQuery));
		}
	}, [dispatch, page, sortBy, order, debouncedQuery]);

	// debounce
	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedQuery(query);
		}, 400);

		return () => clearTimeout(timeout);
	}, [query]);

	const handleAddProduct = (data: CreateProductDto) => {
		dispatch(
			addProduct({
				id: Date.now(),
				title: data.title,
				price: data.price,
				brand: data.brand,
				sku: data.sku,
				category: data.category,
				rating: 0,
				thumbnail: "",
			}),
		);

		showToast("Товар добавлен");
	};

	return (
		<div className={styles.container}>
			<div
				className={cn(
					styles.searchWrapper,
					styles.section,
				)}
			>
				<Title>Товары</Title>

				<input
					type="search"
					className={styles.search}
					placeholder="Найти"
					value={query}
					autoFocus
					onChange={(e) => {
						dispatch(
							setSearchMode(
								Boolean(
									e.target
										.value,
								),
							),
						);
						dispatch(setPage(1));
						setQuery(e.target.value);
					}}
				/>
			</div>

			<div className={cn(styles.main, styles.section)}>
				<TableHead setIsModalOpen={setIsModalOpen} />
				<ProductsList />
				<Pagination
					currentPage={page}
					total={total}
					limit={limit}
					onChange={(newPage: number) =>
						dispatch(setPage(newPage))
					}
				/>
			</div>

			{isModalOpen && (
				<AddProductModal
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleAddProduct}
				/>
			)}
		</div>
	);
};
