import React, { useEffect, useContext } from 'react';
import { InputGroup, InputLeftElement, Input, InputRightElement, Kbd } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AdminContext from '../contexts/AdminContext';

function SearchBar() {

    const { words, setDisplayWords } = useContext(AdminContext);

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

    const filterWord = (e) => {
        const searchInput = e.target.value;

        setDisplayWords(words.filter(word => word.word.includes(searchInput)))
    }

    return (
        <InputGroup color="white">
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="teal" />}
            />
            <Input onChange={filterWord} id="search-input" bg="white" shadow="md" color="teal" focusBorderColor="teal.500" type="text" placeholder="Search Word" />
            <InputRightElement >
                <Kbd bg="teal.100" borderColor="teal.300" color="teal.400">/</Kbd>
            </InputRightElement>
        </InputGroup>
    )
}

export default SearchBar
