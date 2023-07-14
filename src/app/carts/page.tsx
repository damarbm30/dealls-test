import { CustomTable } from "~/components";
import { cartsColumns } from "~/constants";
import { fetchData } from "~/utils";

const Carts = async () => {
  const data = await fetchData("/carts");

  // @ts-ignore
  return <CustomTable columns={cartsColumns} data={data} page="carts" />;
};
export default Carts;
