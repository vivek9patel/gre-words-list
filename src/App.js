import WordsTable from "./components/WordsTable";
import { Box, Flex } from "@chakra-ui/react"
import Header from "./components/Header";
import AddWord from "./components/AddWord";

function App() {
  return (
    <Box mb="10" bg="cyan.500" w="100vw">
      <Header />
      <Flex mt="4" px="4" py="2" align="flex-end" justify="flex-end">
        <AddWord />
      </Flex>
      <WordsTable />
    </Box>
  );
}

export default App;
