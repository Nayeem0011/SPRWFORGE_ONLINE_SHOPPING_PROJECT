import { Link } from "react-router-dom";

type Category = {
  id: number;
  title: string;
  slug: string;
};

type Product = {
  title: string;
  current_categories: Category[];
};

interface Props {
  product: Product;
}

export default function Breadcrumb({ product }: Props) {
  return (
    <nav className="text-[13.5px] text-[#111111] font-semibold">
      <ul className="flex items-center gap-2">
        {product.current_categories.map((cat) => (
          <li key={cat.id} className="flex items-center">
            <Link
              to={`/category/${cat.slug}`}
              className="capitalize p-3 hover:bg-white"
            >
              {cat.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
