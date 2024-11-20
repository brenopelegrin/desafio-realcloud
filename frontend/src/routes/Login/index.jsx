import { useState } from 'react';

import { Link as RouteLink } from 'react-router-dom';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import DummyBox from '../../components/DummyBox';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage(nextpage) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoBox, setInfoBox] = useState(<></>);

  const { signed, Login } = useAuth();
  async function handleLogin({email, password}) {
    setInfoBox(infoBoxComponent({status:'info', message:'Aguardando o servidor...'}))
    const {status, message} = await Login({
      email: email,
      password: password,
    });
    return({status, message})
  }

  const handleSubmit = event => {
    event.preventDefault();
  };

  const infoBoxComponent = ({status, message}) => {
    return(
      <Alert status={status} borderRadius={15}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }
  return (

    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <DummyBox>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Entre na sua conta</Heading>
          <Text fontSize={'md '}>
            Ainda não tem uma? <Link color={useColorModeValue('blue.600', 'blue.400')}><RouteLink to="/signup">Clique aqui para criar</RouteLink></Link> ✌️
          </Text>
        </Stack>  
        </DummyBox>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
          {infoBox}
            <FormControl isRequired id="email">
              <FormLabel>Email USP</FormLabel>
              <Input 
                focusBorderColor='blue.400'
                background={useColorModeValue('gray.100', 'blackAlpha.300')}
                placeholer='Digite seu email'
                type="email"
                onChange={event => setEmail(event.currentTarget.value)} />
            </FormControl>
            <FormControl isRequired id="password">
              <FormLabel>Senha do spotted</FormLabel>
              <Input
                focusBorderColor='blue.400'
                placeholder='Digite sua senha'
                background={useColorModeValue('gray.100', 'blackAlpha.300')}
                type="password"
                onChange={event => setPassword(event.currentTarget.value)}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox colorScheme='blue'>Lembrar</Checkbox>
                <Link color={useColorModeValue('blue.600','blue.400')}>Esqueci minha senha</Link>
              </Stack>
              <Button
                bg={'blue.500'}
                color={'white'}
                type="submit"
                onClick={async () => {
                  const {status, message} = await handleLogin({email: email, password: password});
                  setInfoBox(infoBoxComponent({status, message}))
                }}
                _hover={{
                  bg: 'blue.600',
                }}>
                Entrar
              </Button>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}