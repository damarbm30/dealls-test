import { CartDetailType, UsersType } from "~/types/common";
import { fetchData } from "~/utils";
import { CustomTable } from "~/components";
import { cartsColumns } from "~/constants";

type ProductType = {
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

const Product = ({ title, price, quantity, total, discountPercentage, discountedPrice }: ProductType) => {
  return (
    <div className="border-b-2 py-2 last:border-0 last:pb-0 last:pt-2">
      <div className="grid md:grid-cols-2">
        <div className="mb-2 md:mb-0">
          <p>Product name: {title}</p>
          <p>Price: {price}</p>
          <p>Quantity: {quantity} item(s)</p>
          <p>Total price: {total}</p>
        </div>
        <div>
          <p>Discount: {discountPercentage}%</p>
          <p>Price after discount: {discountedPrice}</p>
        </div>
      </div>
    </div>
  );
};

const CartDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const carts = await fetchData(`/carts`);
  const cart = (await fetchData(`/carts/${id}`)) as CartDetailType;
  const { products, total, discountedTotal, userId, totalProducts, totalQuantity } = cart || {};
  const user = (await fetchData(`/users/${userId}`)) as UsersType;
  const { firstName, lastName, email } = user || {};

  return (
    <section>
      <div className="mb-8 w-full">
        <div className="mb-4 flex w-full flex-col rounded-lg px-4 py-2 shadow-md">
          <div className="border-b-2 pb-2">
            <h1 className="text-xl font-bold">Cart {id}</h1>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="py-2">
              <p>
                Buyer's name: {firstName} ${lastName}
              </p>
              <p>Buyer's email: {email}</p>
            </div>
            <div className="pt-2">
              <p>Original price: {total}</p>
              <p>Price after discount: {discountedTotal}</p>
              <p>Products: {totalProducts} product(s)</p>
              <p>Quantity: {totalQuantity} item(s)</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col rounded-lg px-4 py-2 shadow-md">
          <div className="border-b-2 pb-2">
            <h1 className="text-xl font-bold">Products of Cart {id}</h1>
          </div>
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className="mx-auto w-fit overflow-x-auto pb-8">
        <CustomTable columns={cartsColumns} data={carts} page="carts" />
      </div>
    </section>
  );
};
export default CartDetail;
