import { Link } from "react-router-dom";
import History from "./History";
import Login from "../pages/Login";
const Nav = () => {
  return (
    <div>
      <nav>
        <History />
        <Link to="/login"><button>Login</button></Link>
      </nav>
    </div>
  );
};
export default Nav;
