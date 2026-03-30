import cn from "classnames";
import styles from "./Pagination.module.css";

interface Props {
	currentPage: number;
	total: number;
	limit: number;
	onChange: (page: number) => void;
}

export const Pagination = ({ currentPage, total, limit, onChange }: Props) => {
	const totalPages = Math.ceil(total / limit);

	const start = (currentPage - 1) * limit + 1;
	const end = Math.min(currentPage * limit, total);

	// показываем максимум 5 страниц
	const pages = [];
	const maxVisible = 5;

	let startPage = Math.max(1, currentPage - 2);
	const endPage = Math.min(totalPages, startPage + maxVisible - 1);

	if (endPage - startPage < maxVisible - 1) {
		startPage = Math.max(1, endPage - maxVisible + 1);
	}

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	return (
		<div className={styles.pagination}>
			<span className={styles.info}>
				<span className={styles.infoText}>
					Показано
				</span>{" "}
				{start}–{end}{" "}
				<span className={styles.infoText}>из</span>{" "}
				{total}
			</span>

			<button
				className={cn(
					styles.button,
					styles.arrowButton,
					styles.left,
				)}
				disabled={currentPage === 1}
				onClick={() => onChange(currentPage - 1)}
			></button>

			{pages.map((p) => (
				<button
					key={p}
					className={`${styles.button} ${
						p === currentPage
							? styles.active
							: ""
					}`}
					onClick={() => onChange(p)}
				>
					{p}
				</button>
			))}

			<button
				className={cn(
					styles.button,
					styles.arrowButton,
					styles.right,
				)}
				disabled={currentPage === totalPages}
				onClick={() => onChange(currentPage + 1)}
			></button>
		</div>
	);
};
