import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    AlertDialogCloseButton,
    LightMode,
  } from '@chakra-ui/react'
  import { useProductStore } from "../store/product"


function Deletealert({product, isOpen, onClose}) {

    const {deleteProduct} = useProductStore()

        const handleDeleteProduct = async (pid) => {
            console.log(pid)
            const {success, message} = await deleteProduct(pid)
            if(!success){
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    isClosable: false
                })
            } else {
                toast({
                    title: "Success",
                    description: message,
                    status: "success",
                    isClosable: true,
                    duration: 3000
                })
            }
        }

        
  return (
    <>
     <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='slideInBottom'
        isCentered={{base: false, md:true}}
      >
        <AlertDialogOverlay>
          <AlertDialogContent >
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <LightMode>
              <Button colorScheme='red' onClick={() => handleDeleteProduct(product._id)} ml={3}>
                Delete
              </Button>
              </LightMode>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default Deletealert