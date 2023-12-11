import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-gray-100">
      <div className="container mx-auto flex h-16 justify-between">
        <Link
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2 text-lg font-bold hover:text-gray-300"
        >
          Shortly
        </Link>

        <div className="my-auto flex-shrink-0 items-center lg:flex">
          <Link to="/register">
            <button className="mr-1 self-center rounded bg-blue-400 px-5 py-2 text-xs font-semibold text-gray-900 lg:px-8 lg:py-3">
              Sign up
            </button>
          </Link>
          <Link to="/login">
            <button className="self-center rounded bg-blue-400 px-5 py-2 text-xs font-semibold text-gray-900 lg:px-8 lg:py-3">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
