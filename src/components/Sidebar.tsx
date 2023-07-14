import Link from "next/link";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-screen w-48 -translate-x-full transition-transform sm:translate-x-0">
        <div className="h-full overflow-y-auto bg-secondary px-3 py-4 ">
          <ul className="flex flex-col gap-2">
            <Link href="/products" className="text-lg font-bold text-primary">
              Products
            </Link>
            <Link href="/carts" className="text-lg font-bold text-primary">
              Carts
            </Link>
          </ul>
        </div>
      </div>
      <main className="p-4 sm:ml-48">{children}</main>
    </>
  );
};
export default Sidebar;
