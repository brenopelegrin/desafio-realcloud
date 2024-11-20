import { useState } from 'react';

import {
  BiChat,
  BiSend,
} from 'react-icons/bi';

import {
  AddIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

import { postProtectedSpottedComment } from '../../services/Api';

export default function SendCommentComponent(props){
    const spottedId = props.spottedId;
    const [commentText, setCommentText] = useState('');
    const [showCreateComment, setShowCreateComment] = useState(false);
    const [infoBox, setInfoBox] = useState('');

    const serverError = () => {
        return(
          <Alert status='error' borderRadius={15}>
            <AlertIcon/>
            <AlertDescription>
                Erro no servidor!
            </AlertDescription>
          </Alert>
        )
    }
    const waitingServer = () => {
        return(
            <Alert status='info' borderRadius={15}>
                <AlertIcon/>
                <AlertDescription>
                    Aguardando o servidor...
                </AlertDescription>
            </Alert>
        )
    }
    const successServer = () => {
        return(
            <Alert status='success' borderRadius={15}>
                <AlertIcon/>
                <AlertDescription>
                    Comentário enviado.
                </AlertDescription>
            </Alert>
        )
    }

    async function handleSpottedSubmit(commentText){
        console.log({text: commentText});
        setInfoBox(waitingServer());
        var response = {}
        try {
            response = await postProtectedSpottedComment({ spottedId: spottedId, text: commentText })
        } catch (error){
            setInfoBox(serverError())
            console.log(error)
        }
        if(response.hasOwnProperty('status') && response.status == 200){
            setInfoBox(successServer())
        }
        console.log(response);  
    }

    return(
        <Flex
            direction="column"
            gap={2}
            width="full"
            align="center"
        >
        <Box
            padding="0.5em"
            borderRadius={15}
            margin="2%"
            width="full"
            align="left"
            background={useColorModeValue('blue.300', 'blue.800')}
            display={showCreateComment ? 'block' : 'none'}
        >
            
            <Box 
                align="left"
                marginTop="10px"
                marginX="0.2em"
                padding="0.2em"
                borderRadius={15}
            >

                <Flex
                    gap={2}
                    direction="column"
                >
                    <HStack pb={2}>
                        <HStack>
                            <Icon as={BiChat}/>
                            <Heading 
                                size="sm"
                            >
                                Novo comentário
                            </Heading>
                        </HStack>
                        <Flex position="absolute" padding="75%">
                        <Button size="sm" colorScheme="blue" onClick={() => setShowCreateComment(false)}><CloseIcon/></Button>
                        </Flex>
                        
                    </HStack>
                    {infoBox}
                    <FormControl isRequired id="text">
                    <Textarea 
                        textColor="white"
                        background={useColorModeValue('blue.100', 'blue.700')}
                        placeholder='Digite aqui algo bem curioso...' 
                        focusBorderColor="blue.400"
                        onBlur = {event => setCommentText(event.currentTarget.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <Button
                            id="sendComment"
                            type="button" 
                            onClick={() => handleSpottedSubmit(commentText)}
                            colorScheme="blue"
                        >
                            <Flex align="center" flexDirection="row" gap={2}>
                                <Icon as={BiSend}/>
                                <Text>Enviar</Text>
                            </Flex>
                        </Button>
                    </FormControl>
                </Flex>
        </Box>
    </Box>
    <Button 
        borderRadius={15}
        size="sm" 
        width="50%" 
        gap={2} 
        colorScheme="blue"
        onClick={() => setShowCreateComment(true)}
        display={showCreateComment ? 'none' : 'block'}
    >
        <HStack padding={2}>
            <AddIcon/>
            <Text>Criar comentário</Text>
        </HStack>
    </Button>
    </Flex>
    )
}