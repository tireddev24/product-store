import {createContext, useContext, useEffect, useState} from "react";
import {SERVER_URI as url} from "../utils/secrets";

const AuthContext = createContext();
// const url = "https://product-store-back.onrender.com";

export const AuthProvider = ({children}) => {
	const [userData, setUserData] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const storedData = (() => {
		try {
			return JSON.parse(sessionStorage.getItem("user_data")) || null;
		} catch (error) {
			console.error("Error parsing user data from sessionStorage:", error);
			return null;
		}
	})();

	useEffect(() => {
		if (storedData) {
			const {user} = storedData;
			setUserData(user);
			setIsAuthenticated(true);
		}
	}, []);

	const login = (newData) => {
		sessionStorage.setItem(
			"user_data",
			JSON.stringify({
				user: newData,
			}),
		);

		setUserData(newData);
		setIsAuthenticated(true);
	};

	const logout = () => {
		sessionStorage.removeItem("user_data");
		setUserData(null);
		setIsAuthenticated(false);
		setTimeout(() => {
			window.location.replace("/");
		}, 850);
	};

	return <AuthContext.Provider value={{isAuthenticated, login, logout, userData, url}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
