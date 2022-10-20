enum CATEGORIES_ACTION_TYPES {
  REQUEST = 'categories/REQUEST',
  SUCCESS = 'categories/SUCCESS',
  FAILURE = 'categories/FAILURE',
}

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};

export default CATEGORIES_ACTION_TYPES;
