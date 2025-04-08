import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Container, Heading, Input, LightMode, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../auth/auth'

const Settings = () => {
    
    const {isAuthenticated, userData} = useAuth()

    const [userdata, setUserData] = useState(sessionStorage.getItem('user_data'))

    const {isOpen, onOpen, onClose} = useDisclosure()

    const handleProfileEdit = async (data) => {
            console.log(data)
    }

    if(!isAuthenticated){
        return (
            <Box><Heading>UNAUTHORISED!!</Heading></Box>
        )
    }
  return (
        <Container maxW='container.xl' py={12} pos={'relative'}>
            <Heading> SETTINGS COMING SOON!!</Heading>
            <Input placeholder='First Name' value={userdata.firstname} onChange={(e) => setUserData({...userdata, firstname: e.target.value})} />
            <Input placeholder='Last Name' value={userdata.lastname}onChange={(e) => setUserData({...userdata, lastname: e.target.value})} />
            <Input placeholder='username' value={userdata.username} onChange={(e) => setUserData({...userdata, username: e.target.value})}/>
            <Input placeholder='email' value={userdata.email} onChange={(e) => setUserData({...userdata, email: e.target.value})}/>
            <Button colorScheme='blue' onClick={onOpen}>Save Changes</Button>
            <AlertDialog
                    isOpen={isOpen}
                    onClose={onClose}
                    motionPreset='slideInBottom'
                    isCentered={{base: false, md:true}}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent >
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                          Update Profile
                        </AlertDialogHeader>
            
                        <AlertDialogBody>
                          Are you sure you want to save these changes? 
                        </AlertDialogBody>
            
                        <AlertDialogFooter>
                          <Button onClick={onClose}>
                            Cancel
                          </Button>
                          <LightMode>
                          <Button colorScheme='green' onClick={() => handleProfileEdit(userdata)} ml={3}>
                            Save Changes
                          </Button>
                          </LightMode>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
        </Container>
  )
}

export default Settings