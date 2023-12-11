import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../../redux/store";
import ShortlyForm from "../ShortlyForm";
import ShortlyTable from "../ShortlyTable";

const Home = () => {
  const userState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState) navigate("/login");
  }, [userState, navigate]);

  return (
    <>
      <ShortlyForm />
      <ShortlyTable />
    </>
  );
};

export default Home;
