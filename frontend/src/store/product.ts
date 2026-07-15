import { create } from "zustand";
import { SERVER_URI as url } from "../lib/secrets";

export const useProfileStore = create<any>((set) => ({
  profileProducts: [],
  setProfileProducts: (profileProducts: any) => set({ profileProducts }),
  fetchPersonalProfile: async () => {
    const res = await fetch(`${url}/api/products/profile`, {
      credentials: "include",
    });
    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with the server",
      };
    }
    const data = await res.json();
    if (res.status === 401) {
      return { success: false, message: data.message };
    }

    set({ profileProducts: data.product });
    return { success: data.success, message: data.message };
  },
  createProduct: async (newProduct: any) => {
    const res = await fetch(`${url}/api/products/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with the server",
      };
    }

    const data = await res.json();

    if (res.status === 401) {
      return { success: false, message: data, res: res.status };
    }

    if (res.status === 403) {
      return { success: false, message: data };
    }

    set((state: any) => ({
      profileProducts: [...state.profileProducts, data.data],
    }));

    return { success: true, message: data.message };
  },
  updateProduct: async (pid: string, updatedProduct: any) => {
    const res = await fetch(`${url}/api/products/profile/edit/${pid}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    //updates UI immediately without refresh
    set((state: any) => ({
      profileProducts: state.profileProducts.map((product: any) =>
        product._id === pid ? data.data : product,
      ),
    }));
    // console.log(profileProducts)
    return { success: data.success, message: data.message };
  },
  deleteProduct: async (pid: string) => {
    const res = await fetch(`${url}/api/products/profile/delete/${pid}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //updates UI immediately without refresh
    set((state: any) => ({
      profileProducts: state.profileProducts.filter((product: any) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProfile: async (updates: any) => {
    try {
      const res = await fetch(`${url}/api/users/update`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      return { success: true, message: data.message, user: data.user };
    } catch (error) {
      return { success: false, message: "Unable to communicate with server" };
    }
  },
}));

export const useCartStore = create<any>((set) => ({
  cart: [],
  setCart: (cart: any) => set({ cart }),
  fetchCart: async () => {
    const res = await fetch(`${url}/api/cart/getcart`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res) {
      return { success: false, message: "Unable to reach server" };
    }
    if (res.status === 400) {
      return { success: false, message: "Access token expired" };
    }
    if (res.status === 401) {
      return { success: false, message: data, cartLength: 0, res: res.status };
    }

    if (res.status === 404) {
      return {
        success: false,
        message: "Unable to reach server",
      };
    }

    set({ cart: data.cart });

    return {
      success: data.success,
      message: data.message,
      cartLength: data.cartLength,
    };
  },
  addToCart: async (pid: string) => {
    try {
      const res = await fetch(`${url}/api/cart/addtocart/${pid}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        return {
          success: false,
          message: "Unable to communicatce with server",
        };
      }

      const data = await res.json();

      set((state: any) => ({ cart: [...state.cart, data.cart] }));

      return { success: data.success, message: data.message };
    } catch (error) {
      return { success: false, message: "Unable to communicate with server" };
    }
  },
  removeFromCart: async (pid: string) => {
    if (!pid) {
      return { success: false, message: "Invalid Product id" };
    }

    try {
      const res = await fetch(`${url}/api/cart/removefromcart/${pid}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res) {
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      set((state: any) => ({
        cart: state.cart.filter((product: any) => product._id !== pid),
      }));
      return { success: data.success, message: data.message };
    } catch (error) {
      return { success: false, message: "Unable to communicate with server" };
    }
  },
}));

export const useProductStore = create<any>((set) => ({
  products: [],
  setProducts: (products: any) => set({ products }),

  fetchProducts: async () => {
    const res = await fetch(`${url}/api/products`);
    const data = await res.json();
    set({ products: data.data });
  },

  fetchSearchedProduct: async (pid: string) => {
    const res = await fetch(`${url}/api/products/search/${pid}`);
    const data = await res.json();
    set({ products: data.data });
  },

  createProduct: async (newProduct: any) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }
    const res = await fetch(`${url}/api/products/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with the server",
      };
    }

    const data = await res.json();

    if (data.success) {
      set((state: any) => ({ products: [...state.products, data.data] }));
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  },
}));

export const useFavStore = create<any>((set) => ({
  favorites: [],
  setFavorites: (favorites: any) => set({ favorites }),

  getFavorites: async () => {
    try {
      const res = await fetch(`${url}/api/fav/getfav`, {
        credentials: "include",
      });

      if (!res.ok) {
        return { success: false, message: "Unable to fetch favorites" };
      }

      const data = await res.json();
      set({ favorites: data.favs });

      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error fetching favorites",
      };
    }
  },

  addToFavorites: async (pid: string) => {
    try {
      const res = await fetch(`${url}/api/fav/addtofav/${pid}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        return {
          success: false,
          message: "Unable to communicate with the server",
        };
      }

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: "An unexpected error occured" };
      }

      set((state: any) => ({
        favorites: [...state.favorites, data.favs],
      }));

      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: "Unable to add to favorites",
      };
    }
  },

  removeFromFavorites: async (pid: string) => {
    const res = await fetch(`${url}/api/fav/removefromfav/${pid}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: "An unexpected error occured" };
    }

    set((state: any) => ({
      favorites: state.favorites.filter((fav: any) => fav._id !== pid),
    }));

    return {
      success: data.success,
      message: data.message,
    };
  },
}));
