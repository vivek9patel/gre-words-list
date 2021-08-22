import React from 'react'
import {
    Tbody,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from "@chakra-ui/react"
import WordRow from './WordRow'

function WordList() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Tbody>
                <WordRow word="vivek" meaning="vivek" description="not needed!" openModal={onOpen} />
            </Tbody>
            <Modal size="2xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        aadad
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default WordList
