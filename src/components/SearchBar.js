import React from 'react';
import { InputGroup, InputLeftElement, Input, InputRightElement, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar() {
    return (
        <InputGroup color="white">
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="teal" />}
            />
            <Input bg="white" shadow="md" color="teal" focusBorderColor="teal.500" type="text" placeholder="Search Word" />
            <InputRightElement >
                <Button color="teal.500" fontSize="lg" size="sm" variant="unstyled" borderRadius="md" fontWeight="semibold">
                    /
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default SearchBar
