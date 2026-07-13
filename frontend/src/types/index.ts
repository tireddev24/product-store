export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  favs?: any[];
  products?: any[];
  cartedProducts?: any[];
}

export interface Product {
  _id: string;
  name: string;
  price: string | number;
  image: string;
  fav?: boolean;
  owner: {
    _id: string;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  cartowner: {
    _id: string;
    username: string;
    email: string;
  };
}

export interface FavoriteItem {
  _id: string;
  product: Product;
}

export interface FavoriteResponse {
  _id: string;
  favs: FavoriteItem[];
}
