import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { GiShoppingCart } from "react-icons/gi";

const CartIcon = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="relative inline-block bg-white hover:bg-blue-50 shadow-md p-2 rounded-full">
      <GiShoppingCart className="text-[24px]" />

      {/* badge */}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
