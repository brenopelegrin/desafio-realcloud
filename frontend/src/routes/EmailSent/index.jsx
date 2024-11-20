import { FiMail } from 'react-icons/fi';
import { Link as RouteLink } from 'react-router-dom';

import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function EmailSentPage() {

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'} pb={4}>
            <HStack alignItems="center" align="center" flexDirection='row' gap={2}>
                <Icon as={FiMail}/>
                <Text>Verificar identidade</Text>
            </HStack></Heading>
          <Text fontSize={'lg'} textAlign="center">
             Um email de verificação foi enviado.
          </Text>
          <Text fontSize={'lg'} textAlign="center">
            Verifique sua caixa de entrada e ative sua conta.
          </Text>
        </Stack> 
        
        <Button
            colorScheme="blue"
        ><RouteLink to="/feed">Ir para o feed</RouteLink></Button> 
      </Stack>
    </Flex>
  );
}