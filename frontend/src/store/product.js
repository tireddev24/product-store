import { create } from "zustand";

// const url = "http://localhost:8002";
// const url = 'https://bp8ntrs2-8002.uks1.devtunnels.ms'
const url = "https://product-store-back.onrender.com"; //for deployment  //is only needed when backend and frontend are hosted seperately

export const useProfileStore = create((set) => ({
  profileProducts: [],
  setProfileProducts: (profileProducts) => set({ profileProducts }),
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
  createProduct: async (newProduct) => {
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

    set((state) => ({
      profileProducts: [...state.profileProducts, data.data],
    }));

    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
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
    set((state) => ({
      profileProducts: state.profileProducts.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    // console.log(profileProducts)
    return { success: data.success, message: data.message };
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`${url}/api/products/profile/delete/${pid}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //updates UI immediately without refresh
    set((state) => ({
      profileProducts: state.profileProducts.filter(
        (product) => product._id !== pid
      ),
    }));
    return { success: true, message: data.message };
  },
  getFav: async () => {
    const res = await fetch(`${url}/api/fav/getfav`, {
      credentials: "include",
    });
  },
}));

export const useCartStore = create((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  fetchCart: async () => {
    const res = await fetch(`${url}/api/cart/getcart`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res) {
      return { success: false, message: "Unable to reach server" };
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
  addToCart: async (pid) => {
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

      set((state) => ({ cart: [...state.cart, data.cart] }));

      return { success: data.success, message: data.message };
    } catch (error) {
      return { success: false, message: "Unable to communicate with server" };
    }
  },
  removeFromCart: async (pid) => {
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

      set((state) => ({
        cart: state.cart.filter((product) => product._id !== pid),
      }));
      return { success: data.success, message: data.message };
    } catch (error) {
      return { success: false, message: "Unable to communicate with server" };
    }
  },
}));

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    const res = await fetch(`${url}/api/products`);
    const data = await res.json();
    set({ products: data.data });
  },

  fetchSearchedProduct: async (pid) => {
    const res = await fetch(`${url}/api/products/search/${pid}`);
    const data = await res.json();
    set({ products: data.data });
  },

  createProduct: async (newProduct) => {
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
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`${url}/api/products/${pid}`, {
      method: "PUT",
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
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    set((state) => ({}));
    set((state) => ({
      profileProducts: state.profileProducts.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`${url}/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //updates UI immediately without refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateFav: async (pid, favStat) => {
    const res = await fetch(`${url}/api/products/fav/${pid}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favStat),
    });
    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    //updates UI immediately without refresh
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: data.message, data: data.data };
  },
}));

export const useFavStore = create((set) => ({
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),

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

  addToFavorites: async (pid) => {
    try {
      const res = await fetch(`${url}/api/fav/addtofav/${pid}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        return { success: false, message: "Unable to Add to Favorites" };
      }

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: "An unexpected error occured" };
      }

      set((state) => ({
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

  removeFromFavorites: async (pid) => {
    const res = await fetch(`${url}/api/fav/removefromfav/${pid}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: "An unexpected error occured" };
    }

    set((state) => ({
      favorites: state.favorites.filter((fav) => fav._id !== pid),
    }));

    return {
      success: data.success,
      message: data.message,
    };
  },
}));
