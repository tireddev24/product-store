import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react"
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import Create from "../components/create";


const CreatePage = () => {

    
const {userData} = useAuth()
const { createProduct } = useProductStore()
const navigate = useNavigate()
const toast = useToast()

const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:"",
    owner: userData._id
});

const nameref  = useRef(null)
const priceref  = useRef(null)
const imageref  = useRef(null)

const handleAddProduct = async () => {
    const {success, message } = await createProduct(newProduct)

        toast({
            status: success? "success" : "error",
            description: message,
            isClosable: false,
            duration: 2500,
            position:'top'
        })
        if(success) {
            setNewProduct({name:"", price:"", image:""})
            navigate(`/profile/${userData.email}`)
            }
}

    function handleref () {
        if(!newProduct.name && !newProduct.price && !newProduct.image){
            nameref.current.focus()
        } else if(newProduct.name) { priceref.current.focus() }
        else if(newProduct.price) { imageref.current.focus()}
    }


  return (

    <Create
    handleAddProduct= {handleAddProduct}
    setNewProduct={setNewProduct}
    handleref={handleref}
    newProduct={newProduct}
     nameref={nameref}
     priceref={priceref}
     imageref={imageref}

/>
  
  )
}

export default CreatePage