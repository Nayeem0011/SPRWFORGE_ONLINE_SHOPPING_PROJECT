import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeBackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-[#333] font-medium"
      >
        <span className="inline-flex items-center text-[14px]">Home</span>
        <FaChevronRight className="inline-flex items-center text-[12px]" />
      </button>
    </div>
  );
};

export default HomeBackButton;
