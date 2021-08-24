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
    useToast
} from "@chakra-ui/react"
import firebase from '../backend/Firestore';
import WordRow from './WordRow'

function WordList() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [words, setWords] = useState([])
    const [modalWord, setModalWord] = useState({});
    const [loading, setLoading] = useState(true)
    const ref = firebase.firestore().collection('words')
    const toast = useToast();

    useEffect(() => {
        ref.onSnapshot((snapshot) => {
            let wordList = []
            snapshot.docs.forEach((doc) => {
                const wordObj = doc.data()
                wordList.push({
                    ...wordObj,
                    id: doc.id,
                });
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
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    const openModal = (wordObj) => {
        setModalWord(wordObj);
        onOpen();
    }

    const deleteWord = (modalWord) => {
        onClose();
        ref.doc(modalWord.id).delete().then(() => {
            toast({
                title: `${modalWord.word} Deleted!`,
                status: 'success',
                isClosable: true,
            })
        })
    }

    return (
        <>
            {
                loading ?
                    <>
                    </>
                    :
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
                                    <Button colorScheme="red" mr={3} onClick={() => { deleteWord(modalWord) }}>
                                        Delete Word
                                    </Button>
                                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
            }
        </>
    )
}

export default WordList
