import React, { useEffect } from 'react';
import { InputGroup, InputLeftElement, Input, InputRightElement, Button } from '@chakra-ui/react';
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
                <Button color="teal.500" fontSize="lg" size="sm" variant="unstyled" borderRadius="md" fontWeight="semibold">
                    /
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default SearchBar
