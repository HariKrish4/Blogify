import Link from "next/link";

const StyledHeader: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Blogify</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default StyledHeader;
