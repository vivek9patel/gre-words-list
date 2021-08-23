import React, { useEffect } from 'react';
import { InputGroup, InputLeftElement, Input, InputRightElement, Kbd } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar() {

    useEffect(() => {
        window.addEventListener('keydown', focusSearchBar);
        return () => {
            window.removeEventListener('keydown', focusSearchBar);
        }
    }, [])

    const focusSearchBar = (e) => {
        const searchInput = document.getElementById('search-input');

        if (searchInput === document.activeElement) {
            return;
        }

        if (e.key === '/') {
            e.preventDefault();
            searchInput.focus();
            document.execCommand("selectall", null, false);
        }
    }

    return (
        <InputGroup color="white">
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="teal" />}
            />
            <Input id="search-input" bg="white" shadow="md" color="teal" focusBorderColor="teal.500" type="text" placeholder="Search Word" />
            <InputRightElement >
                <Kbd bg="teal.100" borderColor="teal.300" color="teal.400">/</Kbd>
            </InputRightElement>
        </InputGroup>
    )
}

export default SearchBar
