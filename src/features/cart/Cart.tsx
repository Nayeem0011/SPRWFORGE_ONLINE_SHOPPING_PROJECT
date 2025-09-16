import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { addToCart, deleteFromCart, removeFromCart } from "../../store/cartSlice";
import toast from "react-hot-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const total = cart.reduce((sum, item) => sum + item.selling * item.quantity, 0);

  const handleRemoveOne = (id: number) => {
    dispatch(removeFromCart(id));
    toast.error("Item quantity decreased", { duration: 2000 });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddOne = (item: any) => {
    dispatch(addToCart(item));
    toast.success("Item quantity increased", { duration: 2000 });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteFromCart(id));
    toast.error("Item removed from cart", { duration: 2000 });
  };

  return (
    <div className="max-w-3xl mx-auto my-10 rounded-xl w-full h-[80vh] bg-white shadow-2xl p-0 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold text-[#470096]">Your Items</h1>
        <button onClick={() => navigate("/")}>
          <RxCross2 size={24} className="text-gray-600 hover:text-black" />
        </button>
      </div>

      {/* Scrollable Cart Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <p className="text-center text-gray-500">
              There are no items in this cart
            </p>
            <button
              onClick={() => navigate("/")}
              className="border border-[#470096] text-[#470096] w-60 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition duration-200"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded-lg shadow-sm flex gap-4"
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `https://shop.sprwforge.com/uploads/${item.image}`
                  }
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded"
                />

                <div className="flex-1">
                  <p className="text-sm text-gray-500">ID: {item.id}</p>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-sm text-[#470096]">
                    Category:{" "}
                    {item.current_categories?.[0]?.title || "Unknown"}
                  </p>
                  <p className="text-md font-semibold">
                    € {item.selling} x {item.quantity} = €{" "}
                    {(item.selling * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={() => handleRemoveOne(item.id)}
                    >
                      <FaMinus />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={() => handleAddOne(item)}
                    >
                      <FaPlus />
                    </button>

                    <button
                      className="ml-auto text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="border-t px-6 py-4">
          <h2 className="text-xl font-bold text-right">
            Total: € {total.toFixed(2)}
          </h2>
          <Link to={"/ordersection"}>
            <button className="font-semibold mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#f7f8fa] rounded-xl to-[#e7e9ec] border border-[#bbb] shadow-inner text-base h-[44px] leading-[42px] px-4 mb-1 
              transition-all duration-100 ease-in-out  no-underline hover:from-[#e7e9ec] hover:to-[#f7f8fa] hover:border-gray-400">
              Order Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
