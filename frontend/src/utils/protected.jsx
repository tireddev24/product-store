import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  // const { isAuthenticated } = useAuth();
  const storedData = JSON.parse(sessionStorage.getItem("user_data"));

  const token = storedData && storedData.user.username;

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
