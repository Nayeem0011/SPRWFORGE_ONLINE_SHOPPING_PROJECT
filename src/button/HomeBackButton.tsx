import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeBackButton = () => {

  return (
    <div>
      <Link to="/">
      <button
        className="flex items-center gap-1 text-[#111111] font-medium"
      >
        <span className="inline-flex items-center text-[15px]">Home</span>
        <FaChevronRight className="inline-flex items-center text-[12px]" />
      </button>
      </Link>
    </div>
  );
};

export default HomeBackButton;
