import { useEffect, useState } from "react";
import WordsTable from "./components/WordsTable";
import { Box, Flex, useToast } from "@chakra-ui/react"
import Header from "./components/Header";
import AddWord from "./components/AddWord";
import { admins } from './backend/Firestore';
import AdminContext from './contexts/AdminContext';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [adminList, setAdminList] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const toast = useToast();

  useEffect(() => {
    admins.then(admins => {
      setAdminList(admins);
    });
  }, []);

  const checkAuthenticated = () => {
    if (!isAuthenticated) {
      toast({
        title: `Login to do modifications`,
        status: 'warning',
        isClosable: true,
      })
      return false;
    }
    return true;
  }

  const isAdmin = () => {
    if (!checkAuthenticated()) return false;

    if (!adminList.includes(user.email.toLowerCase())) {
      toast({
        title: `You're not authorised for this operation`,
        status: 'warning',
        isClosable: true,
      })
      toast({
        title: `contact vivek.p9737@gmail.com`,
        status: 'info',
        isClosable: true,
      })
      return false;
    }
    return true;
  }

  return (
    <AdminContext.Provider value={{ isAdmin, checkAuthenticated }}>
      <Box mb="10" bg="cyan.500" w="100vw">
        <Header />
        <Flex mt="4" px="4" py="2" align="flex-end" justify="flex-end">
          <AddWord />
        </Flex>
        <WordsTable />
      </Box>
    </AdminContext.Provider>
  );
}

export default App;
