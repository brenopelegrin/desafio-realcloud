import { Link as RouteLink } from 'react-router-dom';

import {
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function NotFoundPage() {

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Página não encontrada</Heading>
          <Text fontSize={'lg'}>
            Voltar à <Link color={useColorModeValue('blue.600', 'blue.400')}><RouteLink to="/">página inicial</RouteLink></Link>
          </Text>
        </Stack>  
      </Stack>
    </Flex>
  );
}