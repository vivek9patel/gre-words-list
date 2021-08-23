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
    const ref = firebase.firestore().collection('words')

    useEffect(() => {
        ref.onSnapshot((snapshot) => {
            let wordList = []
            snapshot.docs.forEach((doc) => {
                const wordObj = doc.data()
                wordList.push(wordObj);
            })

            // sort wordList by wordList.word
            wordList.sort((a, b) => {
                if (a.word < b.word) {
                    return -1;
                } else if (a.word > b.word) {
                    return 1;
                } else {
                    return 0;
                }
            })

            setWords(wordList)
        })
        // eslint-disable-next-line
    }, [])

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
