import {
  useEffect,
  useState,
} from 'react';

import {
  FaEdit,
  FaPlus,
  FaRedo,
  FaSearch,
  FaTrash,
} from 'react-icons/fa';

import {
  EditIcon,
  SmallCloseIcon,
} from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import {
  deleteUserById,
  getAllUsers,
  postNewUser,
} from '../../services/Api';

export default function Feed() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isCreatorOpen, onOpen: onCreatorOpen, onClose: onCreatorClose } = useDisclosure();

    const [newPersonName, setNewPersonName] = useState('');
    const [newPersonBalance, setNewPersonBalance] = useState('');
    const [newPersonDOB, setNewPersonDOB] = useState('');

    const [spottedAnonymous, setSpottedAnonymous] = useState(false);
    const [infoBox, setInfoBox] = useState(<></>);
  
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
    
    
      async function handleNewPersonSubmit(newPersonName, newPersonBalance, newPersonDOB){
        setInfoBox(waitingServer())

        const newData = {
          name: newPersonName,
          balance: newPersonBalance,
          dob: newPersonDOB,
          currency: 'USD'
        }

        const response = await postNewUser(newData);
        
        if(response.status == 200){
          onCreatorClose();
          setInfoBox(<></>);
          fetchUsers();
        } else {
          setInfoBox(serverError())
        }
      }

    useEffect(() => {
      fetchUsers();
    }, []);
  

    const fetchUsers = async () => {
      const response = await getAllUsers();
      const users = response.data;
      setUsers(users);
      setFilteredUsers(users);
    };
  
    const handleDelete = async (id) => {
      console.log(`Delete user with ID: ${id}`);
      // Add your delete logic here
      const response = await deleteUserById(id);
      await fetchUsers();
    };
  
    const handleEdit = (id) => {
      console.log(`Edit user with ID: ${id}`);
      // Add your edit logic here
    };
  
    const handleSearch = () => {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    };
  
    const handleAdd = () => {
      console.log("Add new user");
      // Add logic to add a new user (e.g., open a modal)
    };
  
    const handleReload = async () => {
      await fetchUsers();
    };

    
    // Calculate total and mean balance
    const totalBalance = filteredUsers.reduce((sum, user) => sum + user.balance, 0);
    const meanBalance = filteredUsers.length > 0 ? totalBalance / filteredUsers.length : 0;
    
    return (
      <VStack spacing={4} p={8} maxWidth="95%" margin="auto" flexDirection="column">
        <HStack spacing={4} width="100%" justify="space-between" align="left" maxWidth="100%">
        <Heading size="lg">Pessoas</Heading>
          <InputGroup maxW="400px">
            <Input
              placeholder="Procurar por nomne"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Procurar"
                icon={<FaSearch />}
                size="sm"
                onClick={handleSearch}
              />
            </InputRightElement>
          </InputGroup>
  
          <HStack spacing={2}>
            <Button
              colorScheme="blue"
              leftIcon={<FaPlus />}
              onClick={onCreatorOpen}
            >
              Criar novo
            </Button>
            <IconButton
              aria-label="Atualizar"
              icon={<FaRedo />}
              colorScheme="blue"
              onClick={handleReload}
            />
          </HStack>
        </HStack>
        <HStack align="left" justify="left" width="100%" gap="10px">
            <Text fontWeight="bold">
            Estatísticas gerais:
            </Text>
            <Text>
            Soma total: {totalBalance.toFixed(2)} {'   |   '} Valor médio: {meanBalance.toFixed(2)}
            </Text>
        </HStack>
  
        <TableContainer width="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nome</Th>
                <Th>Valor</Th>
                <Th>Moeda</Th>
                <Th>Data de nascimento</Th>
                <Th>Criado em</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.balance}</Td>
                  <Td>{user.currency}</Td>
                  <Td>{new Date(user.dob).toLocaleDateString()}</Td>
                  <Td>{new Date(user.created_at).toLocaleString()}</Td>
                  <Td>
                    <IconButton
                      aria-label="Edit User"
                      icon={<FaEdit />}
                      colorScheme="blue"
                      size="sm"
                      mr={2}
                      onClick={() => handleEdit(user.id)}
                    />
                    <IconButton
                      aria-label="Delete User"
                      icon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      <Modal onClose={onCreatorClose} isOpen={isCreatorOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
          <ModalHeader bg={useColorModeValue('gray.200', 'gray.600')}>Criar nova pessoa <ModalCloseButton /></ModalHeader>
          <ModalBody>
            <Flex flexDirection="column" gap={4} pt={4}>
              {infoBox}
              <FormControl isRequired id="text">
                <Text>Nome</Text>
                <Input 
                  placeholder='John Doe...' 
                  onBlur = {event => setNewPersonName(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired id="balance">
                <Text>Valor (USD)</Text>
                <NumberInput defaultValue={0} min={0} max={1000000000} precision={2}>
                    <NumberInputField 
                        onChange={event => setNewPersonBalance(event.currentTarget.value)}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <FormControl isRequired id="dob">
                <Text>Data de nascimento</Text>
                <Input 
                  placeholder='01/01/1999' 
                  onBlur = {event => setNewPersonDOB(event.currentTarget.value)}
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
              <Button id="sendSpotted" type="button" onClick={() => handleNewPersonSubmit(newPersonName, newPersonBalance, newPersonDOB)}>
                <Flex align="center" flexDirection="row" gap={2}>
                <EditIcon/>
                <Text>Criar</Text>
                </Flex>
              </Button>
            </FormControl>
          </Flex>
          </ModalFooter>
      </ModalContent>
      </Modal>
      </VStack>
    );
  }