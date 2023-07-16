import { CustomTable } from "~/components";
import { cartsColumns } from "~/constants";
import { fetchData } from "~/utils";

const Carts = async () => {
  const data = await fetchData("/carts");

  return (
    <div className="overflow-x-auto pb-8">
      <CustomTable columns={cartsColumns} data={data} page="carts" />
    </div>
  );
};
export default Carts;
