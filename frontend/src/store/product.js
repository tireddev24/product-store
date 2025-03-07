import { create } from "zustand"

// const url = 'http://localhost:8002';
const url = 'https://product-store-back.onrender.com';   //for deployment  //is only needed when backend and frontend are hosted seperately


export const useProductStore = create((set) =>({
    products: [],
    setProducts: (products) => set({products}),

    fetchProducts: async () => {
        const res = await fetch(`${url}/api/products`) 
        const data = await res.json()
        set({products: data.data})
    },

    fetchSearchedProduct: async (pid) => {
        const res = await fetch(`${url}/api/products/${pid}`)
        const data = await res.json()
        set({products: data.data})
    },

    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:"Please fill in all fields"}
        }
        const res = await fetch(`${url}/api/products`, {

            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json()    
       
        set((state) => ({products: [...state.products, data.data]}))
        if(data.success){
            return {success: true, message: data.message}
        } else {
            return {success:false, message: "Server Error"}
        }
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`${url}/api/products/${pid}`, {
            method: 'PUT',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
        const data = await res.json()

        if(!data.success){  return { success: false, message: data.message} }
        
        //updates UI immediately without refresh
        set((state) => ({
            products: state.products.map((product) => (product._id === pid? data.data : product))
        }))
        return {success: true, message: data.message}
    },

    deleteProduct: async (pid) => {
            const res = await fetch(`${url}/api/products/${pid}`, {
                method: "DELETE"
            })
            const data = await res.json()
            if(!data.success) return { success: false, message: data.message}
            
            
            //updates UI immediately without refresh
            set(state => ({products: state.products.filter(product => product._id !== pid)}))
            return {success: true, message: data.message}
    },
    updateFav: async (pid, favStat) => {
        const res = await fetch(`${url}/api/products/fav/${pid}`, {
            method: 'PUT',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favStat)
        })
        const data = await res.json()

        if(!data.success){  return { success: false, message: data.message} }
        
        //updates UI immediately without refresh
        set((state) => ({
            products: state.products.map((product) => (product._id === pid? data.data : product))
        }))
        return {success: true, message: data.message, data: data.data}
    },
    removeFav: async (pid, favStat) => {
        const res = await fetch(`${url}/api/products/fav/${pid}`, {
            method: 'PUT',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favStat)
        })
        const data = await res.json()

        if(!data.success){  return { success: false, message: data.message} }
        
        //updates UI immediately without refresh
        set((state) => ({
            products: state.products.map((product) => (product._id === pid? data.data : product))
        }))
        return {success: true, message: data.message}
    },
    
    
    
}
))


