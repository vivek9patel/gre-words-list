import React from 'react'
import {
    Tr,
    Td,
    Link
} from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'

function WordRow({ word, meaning, description, openModal }) {

    return (
        <>
            <Tr px="10">
                <Td>
                    <Link display="flex" alignItems="center" fontWeight="medium" color="teal.800" onClick={openModal}>
                        {word} <ExternalLinkIcon mx="2px" />
                    </Link>
                </Td>
                <Td>{meaning}</Td>
                <Td isNumeric>{description}</Td>
            </Tr>
        </>
    )
}

export default WordRow
