import React, { useRef } from 'react'
import {
    Button, ButtonGroup, IconButton, Modal, useDisclosure, FormControl, FormLabel, Input,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from '@chakra-ui/react';
import firebase from '../backend/Firestore';
import { AddIcon } from '@chakra-ui/icons'

function AddWord() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();

    const wordInput = useRef()
    const descInput = useRef()
    const meanInput = useRef()

    const addWord = () => {
        // get values from input refs
        const word = wordInput.current.value.trim()
        const description = [descInput.current.value.trim()]
        const meaning = [meanInput.current.value.trim()]
        const links = [null];

        if (word.length === 0) {
            wordInput.current.focus();
            toast({
                title: `Enter a Word!`,
                status: 'warning',
                isClosable: true,
            })
            return;
        }

        if (meaning[0].length === 0) {
            meanInput.current.focus();
            toast({
                title: `Enter ${word}'s meaning!`,
                status: 'warning',
                isClosable: true,
            })
            return;
        }

        // add data in firebase
        const docRef = firebase.firestore().collection('words').doc()
        onClose();
        docRef.set({
            word,
            description,
            meaning,
            links
        })
            .then(() => {
                toast({
                    title: `${word} Added!`,
                    status: 'success',
                    isClosable: true,
                })
            }).catch(err => {
                console.log(err)
                toast({
                    title: `Cannot Add ${word}, Something's worng!`,
                    status: 'warning',
                    isClosable: true,
                })
            })

    }

    return (
        <>
            <ButtonGroup onClick={onOpen} size="sm" isAttached variant="outline">
                <Button bg="white" mr="-px">Add Word</Button>
                <IconButton bg="white" aria-label="Add to friends" icon={<AddIcon />} />
            </ButtonGroup>
            <Modal
                initialFocusRef={wordInput}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Word</FormLabel>
                            <Input ref={wordInput} placeholder="Enter Word" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Meaning</FormLabel>
                            <Input ref={meanInput} placeholder="Enter word's meaning" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input ref={descInput} placeholder="Enter word's description" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={addWord} colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddWord
