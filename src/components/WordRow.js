import React from 'react'
import {
    Tr,
    Td,
    Link
} from "@chakra-ui/react"

function WordRow({ word, meaning, description, openModal }) {

    const deleteWord = () => {
        // delete word from firebase
    }

    return (
        <>
            <Tr px="10">
                <Td>
                    <Link onClick={openModal}>
                        {word}
                    </Link>
                </Td>
                <Td>{meaning}</Td>
                <Td isNumeric>{description}</Td>
            </Tr>
        </>
    )
}

export default WordRow
