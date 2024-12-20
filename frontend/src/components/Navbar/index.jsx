import { useState } from 'react';

import {
  BiLogOut,
  BiUser,
} from 'react-icons/bi';
import {
  Link as RouteLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  AddIcon,
  CloseIcon,
  EditIcon,
  HamburgerIcon,
  Icon,
  MoonIcon,
  SettingsIcon,
  SmallCloseIcon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Hide,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import Logo from '../Logo';

const Links = [['Feed', 'feed']];

const NavLink = (props) => (
  <Button
    size='sm'
    width='ful'
    mr={4}
    colorScheme={'gray'}
    rounded={'md'}
    >
    <RouteLink to={props.children[1]}>{props.children[0]}</RouteLink>
  </Button>
);

export default function Navbar() {
  const { signed } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen: isCreatorOpen, onOpen: onCreatorOpen, onClose: onCreatorClose } = useDisclosure();
  const [spottedText, setSpottedText] = useState('');
  const [spottedAnonymous, setSpottedAnonymous] = useState(false);
  const [infoBox, setInfoBox] = useState(<></>);

  const currentLocation = useLocation();

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

  const navigate = useNavigate();

  async function handleSpottedSubmit(spottedText, spottedAnonymous){
    setInfoBox(waitingServer())
    
    if(true){
      onCreatorClose();
      setInfoBox(<></>);
      navigate('/');
    } else {
      setInfoBox(serverError())
    }
  }

  const getThemeIcon = (theme) => {
    if(theme === 'light'){
      return (<MoonIcon/>)
    }
    else{
      return(<SunIcon/>)
    }
  };

  const getUserMenu = (signed) => {
    if(signed){
      return(
          <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Avatar
              size={'sm'}
              name={'Test User'}
              src={
                'anonymous.jpg'
              }
            />
          </MenuButton>
          <MenuList>
            <RouteLink to="/profile">
              <MenuItem isDisabled>
                <HStack spacing={2}><Icon as={BiUser}/><Text>Perfil</Text></HStack>
              </MenuItem>
            </RouteLink>
            <MenuDivider />
            <RouteLink to="/settings">
              <MenuItem isDisabled>
                <HStack spacing={2}><SettingsIcon/><Text>Configurações</Text></HStack>
              </MenuItem>
            </RouteLink>
            <RouteLink to="/logout">
              <MenuItem>
                <HStack spacing={2}><Icon as={BiLogOut}/><Text>Sair</Text></HStack>
              </MenuItem>
            </RouteLink>
          </MenuList>
        </Menu>
      )
    }
  }

  const getCreateButton = (signed) => {
    if(signed){
      return(
        <></>
      )
    }
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'gray.600')} px={4} boxShadow='sm'>

        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Hide above='md'>
            {signed && currentLocation.pathname === '/feed' ? <IconButton 
              position="fixed"
              background={useColorModeValue('gray.500', 'gray.100')}
              bottom="20px"
              right="20px"
              borderRadius="50%"
              colorScheme="gray"
              shadow="xl"
              width="50px"
              height="50px"
              zIndex="1000"
              onClick={onCreatorOpen}
              >
              <AddIcon boxSize="50%"/>
            </IconButton> : null}
            <IconButton
              size={'sm'}
              icon={isOpen ? <CloseIcon/> : <HamburgerIcon />}
              colorScheme="gray"
              aria-label={'Abrir menu'}
              onClick={isOpen ? onClose : onOpen}
            />
          </Hide>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Logo/>
            </Box>
          </HStack>
          <Flex alignItems={'center'}>
            <Button onClick={toggleColorMode}
              variant={'solid'}
              colorScheme={'gray'}
              size={'sm'}
              mr={4}
            >
              {getThemeIcon(colorMode)}
            </Button>
            <Hide below='md'>{getCreateButton(signed)}</Hide>
            { getUserMenu(signed) }
          </Flex>
        </Flex>

        {isOpen ? (
          <Hide above='md'>
            <Box pb={4}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          </Hide>
        ) : null}
      </Box>

      <Modal onClose={onCreatorClose} isOpen={isCreatorOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
          <ModalHeader bg={useColorModeValue('gray.200', 'gray.600')}>Criar novo Spotted <ModalCloseButton /></ModalHeader>
          <ModalBody>
            <Flex flexDirection="column" gap={4} pt={4}>
              {infoBox}
              <FormControl isRequired id="text">
                <Textarea 
                  placeholder='Digite aqui algo bem curioso...' 
                  onBlur = {event => setSpottedText(event.currentTarget.value)}
                  />
              </FormControl>
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='is-anonymous' mb='0'>
                  Mensagem anônima
                </FormLabel>
                <Switch 
                  disabled
                  id='is-anonymous'
                  isChecked={spottedAnonymous}
                  onChange={() => setSpottedAnonymous(current => !current)}
                  />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
          <Flex gap={4} flexDirection="row" justify="space-between">
            <FormControl>
              <Button id="closeSpottedCreator" onClick={onCreatorClose}>
                <Flex align="center" flexDirection="row" gap={2}>
                  <SmallCloseIcon/>
                  <Text>Fechar</Text>
                </Flex>
              </Button>
            </FormControl>
            <FormControl>
              <Button id="sendSpotted" type="button" onClick={() => handleSpottedSubmit(spottedText, spottedAnonymous)}>
                <Flex align="center" flexDirection="row" gap={2}>
                <EditIcon/>
                <Text>Enviar</Text>
                </Flex>
              </Button>
            </FormControl>
          </Flex>
          </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  );
}