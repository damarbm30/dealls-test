import { Charts, CustomTable } from "~/components";
import { fetchData } from "~/utils";
import { productsColumns } from "~/constants";

const Products = async () => {
  const data = await fetchData("/products");

  return (
    <section>
      <div className="overflow-x-auto pb-8">
        <CustomTable columns={productsColumns} data={data} page="products" />
      </div>
      <div className="pt-8">
        <Charts data={data.products} />
      </div>
    </section>
  );
};
export default Products;
