import type { Category } from "../types";

interface Props {
  categories: Category[],
  onCategorySelect: (id: number) => void;
}

const categories: Category[] = [
    { id: 1, title: "Bebidas", slug: "bebidas" },
    { id: 15, title: "Farmacia", slug: "farmacia" },
    { id: 4, title: "Peixaria", slug: "Peixaria" },
    { id: 5, title: "Charcutaria", slug: "charcutaria" },
    { id: 8, title: "Frutas e Legumes", slug: "frutas-e-legumes" },
    { id: 10, title: "Padaria e Pastelaria", slug: "padaria-e-pastelaria" },
    { id: 9, title: "Congelados", slug: "congelados" },
    { id: 11, title: "Laticinios", slug: "laticinios" },
    { id: 12, title: "Refrigerados", slug: "refrigerados" },
    { id: 13, title: "Bricolage e Auto", slug: "bricolage-e-auto" },
    { id: 14, title: "Casa e Jardim", slug: "casa-e-jardim" },
    { id: 7, title: "Petcare", slug: "petcare" },
    { id: 3, title: "Consumiveis", slug: "consumiveis" },
    { id: 14, title: "Merchandising", slug: "merchandising" },
    { id: 15, title: "Talho Próprio", slug: "talho-proprio" },
];


export default function Sidebar({ onCategorySelect }: Props) {
  return (
    <div className="lg:w-64 border-r md:w-[220px]">
      {/* <h2 className="font-bold mb-4">Categories</h2> */}
      <ul>
        {categories.map(cat => (
          <li
            key={cat.id}
            className="cursor-pointer py-1 text-[#333333] text-[16px]"
            onClick={() => onCategorySelect(cat.id)}
          >
            {cat.title}
          </li>
        ))}
      </ul>
    </div>
  );
}




