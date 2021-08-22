import React from 'react';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar() {
    return (
        <InputGroup color="white">
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="teal" />}
            />
            <Input bg="white" shadow="md" color="teal" focusBorderColor="teal.500" type="text" placeholder="Search Word" />
        </InputGroup>
    )
}

export default SearchBar
