import { Link as RouteLink } from 'react-router-dom';

import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function EmailVerifiedPage() {

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'} pb={4} textAlign="center">
              🎉 Parabéns! Seu e-mail foi verificado.
          </Heading>
          <Text align="center" fontSize={'lg'}>
             Agora, todos os seus spotteds e comentários publicados no modo autenticado terão um ícone de verificado.
          </Text>
        </Stack> 
        
        <Button
            colorScheme="blue"
        ><RouteLink to="/feed">Ir para o feed</RouteLink></Button> 
      </Stack>
    </Flex>
  );
}