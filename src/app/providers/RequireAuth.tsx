import { useAppSelector } from "@/app/hooks";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const { user } = useAppSelector((state) => state.auth);

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
