import { Box, Flex, Spacer, Heading, Button, CircularProgress, Image } from '@chakra-ui/react'
import React from 'react';
import SearchBar from './SearchBar';
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
    const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
    return (
        <Box w="100%" px="4" py="2" color="white">
            <Flex align="center">
                <Box p="2">
                    <Heading size="lg">GRE Words</Heading>
                </Box>
                <Spacer />
                <Box w="40%">
                    <SearchBar />
                </Box>
                <Spacer />
                <Box w="150px">
                    <Flex align="center" justify="flex-end">
                        {
                            isAuthenticated &&
                            <Image
                                cursor="pointer"
                                borderRadius="full"
                                boxSize="35px"
                                src={user.picture}
                                alt={user.name}
                                mr="15px"
                                title={user.name}
                            />
                        }
                        <Flex align="center" justify="center">
                            {
                                isLoading ?
                                    <CircularProgress size="8" thickness="10" isIndeterminate color="teal.300" />
                                    :
                                    (isAuthenticated ?
                                        <>
                                            <Button onClick={() => logout({ returnTo: window.location.origin })} variant="outline" colorScheme="white">Logout</Button>

                                        </>
                                        :
                                        <Button onClick={() => loginWithRedirect()} colorScheme="red">Log in</Button>
                                    )
                            }
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default Header
