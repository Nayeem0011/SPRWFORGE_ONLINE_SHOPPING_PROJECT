import { FaAnglesLeft } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";

const SitebarBackButton = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-[#333] font-medium"
            >
              <span className="inline-flex items-center text-[14px]">Home</span>
              <FaAnglesLeft className="inline-flex items-center text-[12px]" />
            </button>
        </div>
    )
}

export default SitebarBackButton
