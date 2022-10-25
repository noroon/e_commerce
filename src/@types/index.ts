export type Item = {
  id: number;
  imageUrl: string;
  title: string;
  path: string;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: Product[];
};

export type CategoryMap = {
  [key: string]: Product[];
};

export type CartItem = {
  quantity: number;
} & Item;

export type Product = {
  name: string;
  price: number;
} & CartItem;

export type CartItemProps = {
  cartItem: Product;
};
