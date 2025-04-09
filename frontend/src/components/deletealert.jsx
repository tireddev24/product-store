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
    useToast,
  } from '@chakra-ui/react'
  import { useProductStore, useProfileStore } from "../store/product"


function Deletealert({product, isOpen, onClose}) {

    const toast = useToast()
    

    const {deleteProduct} = useProfileStore()

    const handleDeleteProduct = async (pid) => {
      const {success, message} = await deleteProduct(pid)

       toast({
          status: success? "success" : "error",
          description: message,
        })
      
          onClose()
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