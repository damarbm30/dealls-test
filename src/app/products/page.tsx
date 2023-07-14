import { Charts, CustomTable } from "~/components";
import { fetchData } from "~/utils";
import { productsColumns } from "~/constants";

const Products = async () => {
  const data = await fetchData("/products");

  return (
    <section>
      <div className="mb-4">
        <CustomTable columns={productsColumns} data={data} page="products" />
      </div>
      <Charts data={data.products} />
    </section>
  );
};
export default Products;
