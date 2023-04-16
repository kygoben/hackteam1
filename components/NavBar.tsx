import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="font-bold text-xl tracking-tight">
          uBrew
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {/* Empty space */}
        </div>
        <div>
          <Link href="/ingredients" className="mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-10">
              My Ingredients
          </Link>
          <Link href="/recipes" className="mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-10">
              My Recipes
          </Link>
          <Link href="/create-recipes" className="mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-10">
              Create Recipe
          </Link>
          <Link href="/account" className="mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-10">
              Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
