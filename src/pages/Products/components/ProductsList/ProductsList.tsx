import { useAppSelector } from "@/app/hooks";
import cn from "classnames";
import styles from "./ProductsList.module.css";

export const ProductsList = () => {
	const { items, loading, error } = useAppSelector(
		(state) => state.products,
	);

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Наименование</th>
					<th>Вендор</th>
					<th>Артикул</th>
					<th>Оценка</th>
					<th>Цена</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				{loading && (
					<tr className={styles.loading}>
						<td colSpan={6}>Загрузка...</td>
					</tr>
				)}
				{error && (
					<tr className={styles.loading}>
						<td colSpan={6}>{error}.</td>
					</tr>
				)}
				{!loading &&
					!error &&
					items.map((product) => (
						<tr key={product.id}>
							<td
								className={
									styles.firstTd
								}
							>
								<div
									className={cn(
										styles.image,
										{
											[styles.noImg]:
												!product.thumbnail,
										},
									)}
								>
									{product.thumbnail && (
										<img
											src={
												product.thumbnail
											}
											alt={
												product.title
											}
											width={
												100
											}
										/>
									)}
								</div>
								<div
									className={
										styles.productNameWrapper
									}
								>
									<span
										className={
											styles.productName
										}
									>
										{
											product.title
										}
									</span>

									<span
										className={
											styles.category
										}
									>
										{
											product.category
										}
									</span>
								</div>
							</td>
							<td>{product.brand}</td>
							<td>{product.sku}</td>
							<td>
								<span
									className={cn(
										{
											[styles.smallRating]:
												product.rating <
												3.5,
										},
									)}
								>
									{
										product.rating
									}
								</span>
								/5
							</td>
							<td>{product.price}</td>
							<td>
								<div
									className={
										styles.plusWrapper
									}
								>
									<button
										className={
											styles.plus
										}
									>
										+
									</button>
									<span
										className={
											styles.dummy
										}
									></span>
								</div>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};
