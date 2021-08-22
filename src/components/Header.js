import { Box, Flex, Spacer, Heading, Button } from '@chakra-ui/react'
import React from 'react'

function Header() {
    return (
        <Box w="100%" px="4" py="2" color="white">
            <Flex align="center">
                <Box p="2">
                    <Heading size="lg">GRE Words</Heading>
                </Box>
                <Spacer />
                <Box>
                    <Button variant="outline" colorScheme="white">Log in</Button>
                    <Button colorScheme="red" ml="4">
                        Sign Up
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default Header
