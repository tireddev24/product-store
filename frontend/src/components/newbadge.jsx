import { Badge, LightMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Newbadge({dateCreated}) {


    const [newStatus, setNewStatus] = useState(false)

     const today = new Date()
    const date = new Date(dateCreated)
    
    useEffect(() => {
        const timediff = today.getTime() - date.getTime()
            if(timediff > 604800000){
                setNewStatus(false)
            } else {setNewStatus(true)}
        
    })
    

  return newStatus? ( 
      <LightMode>
            <Badge position={'absolute'} top={3} right={3} ml='1' fontSize='1em' colorScheme='green'> New </Badge>
      </LightMode>
  ) : (<></>)
}

export default Newbadge