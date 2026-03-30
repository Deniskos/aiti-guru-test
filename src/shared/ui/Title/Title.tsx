import cn from "classnames";
import styles from "./styles.module.css";
import type { TitleProps } from "./Title.props";

export const Title = ({ size = "h1", children }: TitleProps) => {
	if (size === "h2") {
		return (
			<h2 className={cn(styles.title, styles.h2)}>
				{children}
			</h2>
		);
	}
	return <h1 className={cn(styles.title, styles.h1)}>{children}</h1>;
};
