import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { login } from "@/features/auth/authSlice";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector((s) => s.auth);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const [errors, setErrors] = useState<{
		username?: string;
		password?: string;
	}>({});

	const { user } = useAppSelector((s) => s.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	const handleClear = () => {
		setUsername("");
	};

	const handleSubmit = () => {
		const newErrors: typeof errors = {};

		if (!username) newErrors.username = "Введите логин";
		if (!password) newErrors.password = "Введите пароль";

		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) return;

		dispatch(login({ username, password, remember }));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.cardWrapper}>
				<div className={styles.card}>
					<h1 className={styles.title}>
						Добро пожаловать!
					</h1>

					<h2 className={styles.subtitle}>
						Пожалуйста авторизуйтесь
					</h2>

					<label
						className={styles.label}
						htmlFor="login"
					>
						Логин
						<input
							placeholder="Введите логин"
							type="text"
							name="login"
							value={username}
							onChange={(e) =>
								setUsername(
									e.target
										.value,
								)
							}
							className={cn(
								styles.input,
								styles.login,
							)}
						/>
						{username && (
							<button
								onClick={
									handleClear
								}
								className={
									styles.loginClear
								}
								aria-label="Очистить поле"
							></button>
						)}
					</label>
					{errors.username && (
						<div className={styles.error}>
							{errors.username}
						</div>
					)}

					<label
						className={styles.label}
						htmlFor="password"
					>
						Пароль
						<input
							type={
								showPassword
									? "text"
									: "password"
							}
							name="password"
							placeholder="Введите пароль"
							value={password}
							onChange={(e) =>
								setPassword(
									e.target
										.value,
								)
							}
							className={cn(
								styles.input,
								styles.password,
							)}
						/>
						<button
							type="button"
							onClick={() =>
								setShowPassword(
									!showPassword,
								)
							}
							className={
								styles.passButton
							}
						>
							{showPassword
								? "🙈"
								: "👁️"}
						</button>
					</label>

					{errors.password && (
						<div className={styles.error}>
							{errors.password}
						</div>
					)}

					<label className={styles.checkbox}>
						<input
							type="checkbox"
							checked={remember}
							onChange={(e) =>
								setRemember(
									e.target
										.checked,
								)
							}
						/>
						Запомнить данные
					</label>

					{error && (
						<div className={styles.error}>
							{error}
						</div>
					)}

					<button
						className={styles.button}
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? "Вход..." : "Войти"}
					</button>

					<p className={styles.divide}>
						<span
							className={
								styles.separation
							}
						></span>
						или
						<span
							className={
								styles.separation
							}
						></span>
					</p>

					<div className={styles.footer}>
						Нет аккаунта?{" "}
						<a href="/">Создать</a>
					</div>
				</div>
			</div>
		</div>
	);
};
