import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../../redux/store";

const Home = () => {
  const userState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState) navigate("/login");
  }, [userState, navigate]);

  return (
    <div className="text-center font-bold text-white">
      Welcome to Shortly, {userState?.firstName}!
    </div>
  );
};

export default Home;
