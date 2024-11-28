import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div>
      <nav>
        <Link to="/history"><button>History</button></Link>
        <Link to="/login"><button>Login</button></Link>
      </nav>
    </div>
  );
};
export default Nav;
