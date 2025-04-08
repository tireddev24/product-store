import { create } from "zustand";

const url = 'http://localhost:8002'
// const url = 'https://product-store-back.onrender.com';   //for deployment  //is only needed when backend and frontend are hosted seperately


export const useLoginStore = create((set) => ({
    session: [],
    setSession: (session) => set({session}),
    login: async (loginData) =>  {
        const res = await fetch(`${url}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(loginData)
        })
        const data = await res.json()
        if(data.success){
            set({session : data.data})
        }
        return data
    },
    signUp: async (signUpData) =>  {
        const res = await fetch(`${url}/api/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(signUpData)
        })
        const data = await res.json()
        return {success: data.success, message: data.message, data: data.data}

    },
    signOut: async () => {
        set({session: []})
        const data = {
            success: true,
            message: "User signed out"
        }
        return data
    },
    checkUsername: async (u_name) => {
        if(u_name == ''){
            return {message: "No username provided"}
        }

        const res = await fetch(`${url}/api/users/checkusername`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({username: u_name})
        })
        const data = await res.json()

        return data
    }
    

}))