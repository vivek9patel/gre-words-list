import WordsTable from "./components/WordsTable";
import { Box } from "@chakra-ui/react"
import Header from "./components/Header";

function App() {
  return (
    <Box bg="cyan.500" w="100vw" h="100vh">
      <Header />
      <WordsTable />
    </Box>
  );
}

export default App;
