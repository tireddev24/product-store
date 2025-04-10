import { create } from "zustand"

const url = 'http://localhost:8002';
// const url = 'https://product-store-back.onrender.com';   //for deployment  //is only needed when backend and frontend are hosted seperately


export const useProfileStore = create((set) => ({
    profileProducts:[],
    setProfileProducts: (profileProducts) => set({profileProducts}),
    fetchPersonalProfile : async (pid) => {
        const res = await fetch(`${url}/api/products/profile/${pid}`)
        const data = await res.json()

        set({profileProducts: data.product})
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`${url}/api/products/profile/edit/${pid}`, {
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
            profileProducts: state.profileProducts.map((product) => (product._id === pid? data.data : product))
        }))
        // console.log(profileProducts)
        return {success: data.success, message: data.message}
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`${url}/api/products/profile/delete/${pid}`, {
            method: "DELETE"
        })
        const data = await res.json()
        if(!data.success) return { success: false, message: data.message}
        
        
        //updates UI immediately without refresh
        set(state => ({profileProducts: state.profileProducts.filter(product => product._id !== pid)}))
        return {success: true, message: data.message}
},
}))

export const useCartStore = create((set) => ({
    cart: [],
    setCart: (cart) => set({cart}),
    fetchCart: async (pid) => {
        const res = await fetch (`${url}/api/cart/getcart/${pid}`)
        const data = await res.json()

        if(!res){
            return {success: false, message: "Unable to reach server"}
        }

        if(res.status === 404){
            return {success: false, message: "Unable to reach server", cartLength: data.cartLength}
        }

        set({cart: data.cart})

        return { success: data.success, message: data.message, cartLength: data.cartLength}
    },
    addToCart: async (cartProduct) => {

        if(!cartProduct.productId || !cartProduct.prodownerId || !cartProduct.cartownerId){
            return {success:false, message:"Please fill in all fields"}
        }

        try {
            const res = await fetch(`${url}/api/cart/addtocart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartProduct)
        })
        if(!res){ return {success: false, message: "Unable to communicate with server"}}

        const data = await res.json()

        set((state) => ({cart: [...state.cart, data.cart]}))    

        return {success: data.success, message: data.message}


        } catch (error) {
            return {success: false, message: "Unable to communicate with server"}
        }
    },
    removeFromCart: async (pid) => {
        if(!pid){return {success: false, message: "Invalid Product id"}}

        try {
            const res = await fetch(`${url}/api/cart/removefromcart/${pid}`, {method: "DELETE"})
            
            if(!res){ return {success: false, message: "Unable to communicate with server"}}
            
            const data = await res.json()

            set(state => ({cart: state.cart.filter(product => product.cartItemId !== pid)}))
            return {success: true, message: data.message}


        } catch (error) {
            return {success: false, message: "Unable to communicate with server"}
        }
    }
}))


export const useProductStore = create((set) =>({
    products: [],
    setProducts: (products) => set({products}),

    fetchProducts: async () => {
        const res = await fetch(`${url}/api/products`) 
        const data = await res.json()
        set({products: data.data})
    },

    fetchSearchedProduct: async (pid) => {
        const res = await fetch(`${url}/api/products/search/${pid}`)
        const data = await res.json()
        set({products: data.data})
    },

    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:"Please fill in all fields"}
        }
        const res = await fetch(`${url}/api/products/create`, {

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
            return {success:false, message: data.message}
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
        set((state) => ({
            
        }))
        set((state) => ({
            profileProducts: state.profileProducts.map((product) => (product._id === pid? data.data : product))
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
    signUp: async (signUpData) =>  {
        const res = await fetch(`${url}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(signUpData)
        })
        const data = await res.json()

    },

    
    
    
}
))

