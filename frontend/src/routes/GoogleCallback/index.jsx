import {
  useEffect,
  useState,
} from 'react';

import {
  Link as RouteLink,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import {
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';

export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const { signed, CallbackLogin } = useAuth();
  const [isError, setError]= useState(false);
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const callContext = async () => {
      console.log("token is", token);
      const {status, message} = await CallbackLogin(token);
      console.log({status, message});
      if (status == 'success'){
        setError(false);
      } else {
        setError(true);
      }
    }
    callContext();
  }, [])

  if (signed && !isError) {
    return (<Navigate to="/"/>
    )
  }

  return (
    <>
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      flexDirection="column"
      gap="25px"
    >
    <Heading>{isError ? 'Error while logging in with Google...' : 'Logging in with Google...'} </Heading>
    <Button>
    <Text><RouteLink to="/">Go back home</RouteLink></Text>
    </Button>
    </Flex>
    </>
  )
}