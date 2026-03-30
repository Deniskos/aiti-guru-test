import { useState } from "react";
import type { CreateProductDto } from "../../model/types";
import styles from "./AddProductModal.module.css";

interface Props {
	onClose: () => void;
	onSubmit: (data: CreateProductDto) => void;
}

export const AddProductModal = ({ onClose, onSubmit }: Props) => {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [brand, setBrand] = useState("");
	const [sku, setSku] = useState("");
	const [category, setCategory] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onSubmit({
			title,
			price: Number(price),
			brand,
			sku,
			category,
		});

		onClose();
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h2>Добавить товар</h2>

				<form
					onSubmit={handleSubmit}
					className={styles.form}
				>
					<input
						placeholder="Наименование"
						value={title}
						onChange={(e) =>
							setTitle(e.target.value)
						}
						required
					/>

					<input
						placeholder="Категория"
						value={category}
						onChange={(e) =>
							setCategory(
								e.target.value,
							)
						}
						required
					/>

					<input
						placeholder="Цена"
						type="number"
						value={price}
						onChange={(e) =>
							setPrice(e.target.value)
						}
						required
					/>

					<input
						placeholder="Вендор"
						value={brand}
						onChange={(e) =>
							setBrand(e.target.value)
						}
						required
					/>

					<input
						placeholder="Артикул"
						value={sku}
						onChange={(e) =>
							setSku(e.target.value)
						}
						required
					/>

					<div className={styles.actions}>
						<button type="submit">
							Добавить
						</button>
						<button
							type="button"
							onClick={onClose}
						>
							Отмена
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
