import { Link as RouteLink } from 'react-router-dom';

import {
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

export default function Logo(){
    return(
        <HStack flexDirection='row' spacing={3}>
            <Image marginLeft="8px" boxSize='40px' objectFit='cover' src="/hrmanager.png" fallbackSrc='https://via.placeholder.com/150' alt='HR Manager'/>
            <RouteLink to="/">
            <HStack spacing={0} align="center">
                <Text as='b' fontSize='lg'>HR{' '}</Text> 
                <Text fontSize='lg' fontStyle='italic'>{' '}.manager</Text>
            </HStack>
            </RouteLink>
        </HStack>
    )
}