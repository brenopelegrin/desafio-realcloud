import {
  AiFillGithub,
  AiOutlineGoogle,
} from 'react-icons/ai';

import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import DummyBox from '../../components/DummyBox';

export default function LandingPage() {

  const api_authorize_url = "https://desafio-realcloud-w5n6.onrender.com/oauth2/google/authorize"

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
    >
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Gerencie recursos humanos com{' '}
          <Text as={'span'} color={useColorModeValue('blue.600', 'blue.300')}>
            facilidade
          </Text>
        </Heading>
        <DummyBox>
          <HStack>
          <Icon as={AiFillGithub} boxSize='6'/>
          <Text as='span'>
          Desafio de estágio da RealCloud.
          </Text>
            <Text as='span' color={useColorModeValue('blue.800', 'blue.200')}>
              <Link href="https://github.com/brenopelegrin/desafio-realcloud" isExternal>Ver código-fonte</Link>
            </Text>
          </HStack>
        </DummyBox>
        <Stack spacing={6} direction={'row'}>
          <Link href={api_authorize_url}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'blue.500'}
            _hover={{ bg: 'blue.600' }}>
            <HStack>
                <Icon as={AiOutlineGoogle} boxSize={6}/>
                <Text>
                Entrar com Google
                </Text>
            </HStack>
          </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
    </Flex>
  );
}