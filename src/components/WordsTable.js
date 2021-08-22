import React from 'react'
import {
    Box, Table, Link,
    Thead,
    Tr,
    Th,
    TableCaption,
} from "@chakra-ui/react"
import WordList from './WordList'

function WordsTable() {
    return (
        <Box my="4" mx="4" p="4" bg="white" borderRadius="md" shadow="lg">
            <Table size="lg">
                <TableCaption>created by &nbsp;
                    <Link color="teal.500" href="https://www.linkedin.com/in/vivek9patel/" isExternal>
                        vivek9patel
                    </Link>
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Word</Th>
                        <Th>Meaning</Th>
                        <Th isNumeric>Description</Th>
                    </Tr>
                </Thead>
                <WordList />
            </Table>
        </Box>
    )
}

export default WordsTable
