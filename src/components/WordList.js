import React, { useEffect, useState } from 'react'
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
import firebase from '../backend/Firestore';
import WordRow from './WordRow'

function WordList() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [words, setWords] = useState([])
    const [modalWord, setModalWord] = useState({});

    useEffect(() => {
        fetchWords().then((docs) => {
            let wordList = []
            docs.forEach((doc) => {
                const wordObj = doc.data()
                wordList.push(wordObj);
            })
            setWords(wordList)
        })
    }, [])

    const fetchWords = async () => {
        const ref = firebase.firestore().collection('words')
        const words = await ref.get()
        return words.docs;
    }

    const openModal = (wordObj) => {
        setModalWord(wordObj);
        onOpen();
    }

    return (
        <>
            <Tbody>
                {
                    words.map((wordObj, index) => {
                        return <WordRow key={index} word={wordObj.word} meaning={wordObj.meaning[0]} description={wordObj.description[0]} openModal={() => {
                            openModal(wordObj)
                        }} />
                    })
                }
            </Tbody>
            <Modal size="2xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalWord.word}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {modalWord.description}
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
