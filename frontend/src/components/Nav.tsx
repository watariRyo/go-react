import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "../redux/store";

const Nav = () => {
  const logout = async () => {
    await axios.post("logout", {});
  };

  const user = useSelector((state) => state.user);

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
        Company Name
      </a>

      <ul className="my-2 my-md-0 mr-md-3">
        <Link to="/profile" className="p-2 text-white text-decoration-none">
          {user?.name}
        </Link>
        <Link
          to="/login"
          className="p-2 text-white text-decoration-none"
          onClick={logout}
        >
          Sign out
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
