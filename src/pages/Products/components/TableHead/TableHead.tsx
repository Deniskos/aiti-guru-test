import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Title } from "@/shared/ui/Title";
import styles from "./TableHead.module.css";

import {
	fetchProducts,
	refreshTable,
	setPage,
	setSortBy,
	toggleOrder,
} from "@/features/productsSlice";

interface TableHeadProps {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableHead = ({ setIsModalOpen }: TableHeadProps) => {
	const dispatch = useAppDispatch();
	const { sortBy, order } = useAppSelector((state) => state.products);
	return (
		<div className={styles.header}>
			<div className={styles.headLeft}>
				<Title size="h2">Все позиции</Title>

				<div className={styles.sortWrapper}>
					<select
						value={sortBy}
						onChange={(e) => {
							dispatch(
								setSortBy(
									e.target
										.value as
										| "price"
										| "rating",
								),
							);
							dispatch(setPage(1));
						}}
					>
						<option value="price">
							По цене
						</option>
						<option value="rating">
							По рейтингу
						</option>
					</select>

					<button
						className={
							styles.sortOrderButton
						}
						onClick={() => {
							dispatch(toggleOrder());
							dispatch(setPage(1));
						}}
					>
						{order === "asc" ? "↑" : "↓"}
					</button>
				</div>
			</div>
			<div className={styles.headRight}>
				<button
					className={styles.reset}
					onClick={() => {
						dispatch(refreshTable());
						dispatch(fetchProducts());
					}}
				></button>

				<button
					className={styles.add}
					onClick={() => setIsModalOpen(true)}
				>
					Добавить
				</button>
			</div>
		</div>
	);
};
