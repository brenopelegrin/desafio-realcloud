import {
  useEffect,
  useState,
} from 'react';

import { SingleDatepicker } from 'chakra-dayzed-datepicker';
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
  changeUserById,
  deleteUserById,
  getAllUsers,
  postNewUser,
} from '../../services/Api';

export default function Feed() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isCreatorOpen, onOpen: onCreatorOpen, onClose: onCreatorClose } = useDisclosure();
    const { isOpen: isEditorOpen, onOpen: onEditorOpen, onClose: onEditorClose } = useDisclosure();

    const [newPersonName, setNewPersonName] = useState('John Doe');
    const [newPersonBalance, setNewPersonBalance] = useState('0.00');
    const [newPersonDOB, setNewPersonDOB] = useState(new Date());

    const [currPersonName, setCurrPersonName] = useState('');
    const [currPersonBalance, setCurrPersonBalance] = useState('0.00');
    const [currPersonDOB, setCurrPersonDOB] = useState(new Date());
    const [currPersonId, setCurrPersonId] = useState(0);

    const [currExchangeRate, setCurrExchangeRate] = useState(0);
    const [currExchangeCalcId, setCurrExchangeCalcId] = useState(0);
    const [currExchangeValue, setCurrExchangeValue] = useState(0);

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
    
      async function handleNewPersonSubmit(){
        setInfoBox(waitingServer())

        const newData = {
          name: newPersonName,
          balance: newPersonBalance,
          dob: newPersonDOB,
          currency: 'USD'
        }
        
        try {
            const response = await postNewUser(newData);
            onCreatorClose();
            setInfoBox(<></>);
            fetchUsers();
        } catch (err) {
            setInfoBox(serverError())
            console.log(err)
        }
      }

      async function handleEditPersonSubmit(){
        setInfoBox(waitingServer())

        const newData = {
          name: currPersonName,
          balance: currPersonBalance,
          dob: currPersonDOB,
          currency: 'USD'
        }

        try{
            const response = await changeUserById(currPersonId, newData);
            onEditorClose();
            setInfoBox(<></>);
            fetchUsers();
        } catch (err) {
            setInfoBox(serverError())
            console.log(err)
        }
      }

    const handleExchangeCalcSubmit = () => {
        const id = parseInt(currExchangeCalcId);
        const user = filteredUsers.find((user) => user.id === id);
        const balance = Number(user.balance);
        const value_brl = Number(currExchangeRate) * balance;
        setCurrExchangeValue(value_brl.toFixed(6));
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
      // Add your delete logic here
      const response = await deleteUserById(id);
      await fetchUsers();
    };
  
    const handleEdit = (id) => {
      const user = users.find((user) => user.id === id);
      setCurrPersonId(id);
      setCurrPersonName(user.name);
      setCurrPersonBalance(user.balance);
      setCurrPersonDOB(user.dob);
      onEditorOpen();
    };
  
    const handleSearch = () => {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
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
        <HStack paddingTop="10px" align="left" width="100%" flexDirection="row" justifyContent="left" gap="50px">
            <VStack align="left" maxWidth="150px">
                <Text>ID:</Text>
                <Input onChange={(e) => setCurrExchangeCalcId(e.target.value)}>
                </Input>
            </VStack>
            <VStack align="left" maxWidth="250px">
                <Text>Taxa de câmbio (BRL):</Text>
                <HStack>
                <Input maWidth="150px" placeholder={currExchangeRate} onChange={event => setCurrExchangeRate(Number(event.currentTarget.value))}>
                </Input>
                    <Button width="150px" onClick={handleExchangeCalcSubmit}>Calcular</Button>  
                </HStack>
            </VStack>
            <VStack align="left" maxWidth="200px">
            </VStack>
            <VStack align="left" maxWidth="250px">
                <Text>Resultado:</Text>
                <Text>{currExchangeValue}</Text>
            </VStack>
        </HStack>
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
                  placeholder={newPersonName} 
                  onChange = {event => setNewPersonName(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired id="balance">
                <Text>Valor (USD)</Text>
                <NumberInput defaultValue={newPersonBalance} min={0} max={1000000000} precision={2}>
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
                <SingleDatepicker
                    name="dob"
                    date={newPersonDOB}
                    onDateChange={setNewPersonDOB}
                />
            </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
          <Flex gap={4} flexDirection="row" justify="space-between">
            <FormControl>
              <Button id="closePersonCreator" onClick={onCreatorClose}>
                <Flex align="center" flexDirection="row" gap={2}>
                  <SmallCloseIcon/>
                  <Text>Fechar</Text>
                </Flex>
              </Button>
            </FormControl>
            <FormControl>
              <Button id="sendPerson" type="button" onClick={handleNewPersonSubmit}>
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
      <Modal onClose={onEditorClose} isOpen={isEditorOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
          <ModalHeader bg={useColorModeValue('gray.200', 'gray.600')}>Editar pessoa (id={currPersonId}) <ModalCloseButton /></ModalHeader>
          <ModalBody>
            <Flex flexDirection="column" gap={4} pt={4}>
              {infoBox}
              <FormControl isRequired id="text">
                <Text>Nome</Text>
                <Input 
                  placeholder={currPersonName} 
                  onChange = {event => setCurrPersonName(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired id="balance">
                <Text>Valor (USD)</Text>
                <NumberInput defaultValue={currPersonBalance} min={0} max={1000000000} precision={2}>
                    <NumberInputField 
                        onChange={event => setCurrPersonBalance(event.currentTarget.value)}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <FormControl isRequired id="dob">
                <Text>Data de nascimento</Text>
                <SingleDatepicker
                    name="dob"
                    date={currPersonDOB}
                    onDateChange={setCurrPersonDOB}
                />
            </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
          <Flex gap={4} flexDirection="row" justify="space-between">
            <FormControl>
              <Button id="closePersonEditor" onClick={onEditorClose}>
                <Flex align="center" flexDirection="row" gap={2}>
                  <SmallCloseIcon/>
                  <Text>Fechar</Text>
                </Flex>
              </Button>
            </FormControl>
            <FormControl>
            <Button id="editPerson" type="button" onClick={handleEditPersonSubmit}>
                <Flex align="center" flexDirection="row" gap={2}>
                <EditIcon/>
                <Text>Editar</Text>
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