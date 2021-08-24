import React, { useEffect, useState, useContext } from 'react'
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
    useToast,
    Tag,
    TagLabel,
    HStack,
    Text,
    Tooltip
} from "@chakra-ui/react"
import { AttachmentIcon } from '@chakra-ui/icons'
import firebase from '../backend/Firestore';
import WordRow from './WordRow';
import { getAudioUrl } from 'google-tts-api';
import AdminContext from '../contexts/AdminContext';

function WordList() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalWord, setModalWord] = useState({});
    const [loading, setLoading] = useState(true);
    const [wordUrl, setWordUrl] = useState(null);
    const ref = firebase.firestore().collection('words')
    const toast = useToast();

    const { isAdmin, displayWords, setWords } = useContext(AdminContext);

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
        const url = getAudioUrl(wordObj.word, {
            lang: 'en',
            slow: false,
            host: 'https://translate.google.com',
        });
        console.log(url);
        setWordUrl(url);
        setModalWord(wordObj);
        onOpen();
    }

    const deleteWord = (modalWord) => {
        if (isAdmin()) {
            onClose();
            ref.doc(modalWord.id).delete().then(() => {
                toast({
                    title: `${modalWord.word} Deleted!`,
                    status: 'success',
                    isClosable: true,
                })
            })
        }
    }

    const openWordInfo = word => {
        window.open(`https://www.google.com/search?q=${word}+meaning`);
    }

    const playWord = () => {
        window.open(wordUrl)
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
                                displayWords.map((wordObj, index) => {
                                    return <WordRow key={index} word={wordObj.word} meaning={wordObj.meaning[0]} description={wordObj.description[0]} openModal={() => {
                                        openModal(wordObj)
                                    }} />
                                })
                            }
                        </Tbody>
                        <Modal size="2xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader display="flex" alignItems="center">
                                    {modalWord.word}
                                    <Tooltip placement="right" label={`click to play pronounciation`} bg="gray.100" color="black">
                                        <AttachmentIcon onClick={playWord} ml="2" size="sm" cursor="pointer" />
                                    </Tooltip>

                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <HStack spacing={2}>
                                        {
                                            modalWord.synonyms && modalWord.synonyms.map((synonym, idx) => {
                                                return (
                                                    <Tooltip key={idx} hasArrow placement="right" label={`click to view ${synonym} meaning`} bg="white" color="black">
                                                        <Tag onClick={() => { openWordInfo(synonym) }} cursor="pointer" size="md" variant="subtle" colorScheme="teal">
                                                            <TagLabel fontSize="sm">{synonym}</TagLabel>
                                                        </Tag>
                                                    </Tooltip>
                                                )
                                            })
                                        }
                                    </HStack>
                                    <Text mt="2" mb="1" fontSize="3xl"> {modalWord.meaning}</Text>
                                    <Text color="gray.600" fontSize="xl"> {modalWord.description}</Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button size="sm" colorScheme="red" mr={3} onClick={() => { deleteWord(modalWord) }}>
                                        Delete Word
                                    </Button>
                                    <Button size="sm" colorScheme="blue" mr={3} onClick={onClose}>
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
