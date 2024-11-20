import { useSearchParams } from 'react-router-dom';

import { Text } from '@chakra-ui/react';

export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  return (
    <>
    <Text>
      Token is {token}
    </Text>
    </>
  )
}