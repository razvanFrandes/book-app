export interface Subcategory {
  title: string;
  slug: string;
}

export interface Category {
  color: string;
  category: string;
  slug: string;
  subcategories: Subcategory[];
}