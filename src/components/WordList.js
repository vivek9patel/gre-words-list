import React, { useEffect, useState, useContext, useRef } from 'react'
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
    Tooltip, FormControl, FormLabel, Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    ButtonGroup
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
    const [openEditModal, setEditModal] = useState(false);
    const [isConformation, setIsConformation] = useState(false);

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
        closeConfirmation();
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
        window.open(`https://www.google.com/search?q=define+${word}`);
    }

    const playWord = () => {
        window.open(wordUrl)
    }

    const editWord = () => {
        onClose();
        setEditModal(true);
    }

    const closeConfirmation = () => {
        setIsConformation(false);
    }

    const openConfirmation = () => {
        setIsConformation(true);
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
                                                if (synonym.trim().length > 0) {
                                                    return (
                                                        <Tooltip key={idx} hasArrow placement="right" label={`click to view ${synonym} meaning`} bg="white" color="black">
                                                            <Tag onClick={() => { openWordInfo(synonym) }} cursor="pointer" size="md" variant="subtle" colorScheme="teal">
                                                                <TagLabel fontSize="sm">{synonym}</TagLabel>
                                                            </Tag>
                                                        </Tooltip>
                                                    )
                                                }
                                                else return <></>;
                                            })
                                        }
                                    </HStack>
                                    <Text mt="2" mb="1" fontSize="3xl"> {modalWord.meaning}</Text>
                                    <Text color="gray.600" fontSize="xl"> {modalWord.description}</Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Popover
                                        returnFocusOnClose={false}
                                        isOpen={isConformation}
                                        onClose={closeConfirmation}
                                        placement="bottom"
                                        closeOnBlur={false}
                                    >
                                        <PopoverTrigger>
                                            <Button onClick={openConfirmation} size="sm" colorScheme="red" variant="outline" mr={3}>
                                                Delete
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                                Are you sure you want to delete this word?
                                            </PopoverBody>
                                            <PopoverFooter d="flex" justifyContent="flex-end">
                                                <ButtonGroup size="sm">
                                                    <Button onClick={closeConfirmation} variant="outline">Cancel</Button>
                                                    <Button onClick={() => { deleteWord(modalWord) }} colorScheme="red">Delete</Button>
                                                </ButtonGroup>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                    <Button size="sm" colorScheme="yellow" mr={3} onClick={() => { editWord(modalWord) }}>
                                        Edit
                                    </Button>
                                    <Button size="sm" colorScheme="blue" mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <EditWord openEditModal={openEditModal} setEditModal={setEditModal} modalWord={modalWord} />
                    </>
            }
        </>
    )
}

function EditWord({ openEditModal, setEditModal, modalWord }) {
    const { word, meaning, description, synonyms, id } = modalWord

    const [modalWordValue, setModalWordValue] = useState({
        "word": "",
        "meaning": "",
        "description": "",
        "synonyms": "",
        "id": null,
    });

    const wordInput = useRef()

    const toast = useToast();

    useEffect(() => {
        setModalWordValue({
            "word": (word ? word : ""),
            "meaning": (meaning ? meaning[0] : ""),
            "description": (description ? description[0] : ""),
            "synonyms": (synonyms ? synonyms.join(" ") : ""),
            "id": (id ? id : null),
        })
        // eslint-disable-next-line
    }, [modalWord]);

    const changeValue = (key, value) => {
        setModalWordValue({
            ...modalWordValue,
            [key]: value,
        })
    }

    const saveWord = async () => {
        const wordObj = {
            word: modalWordValue["word"].trim(),
            meaning: [modalWordValue["meaning"].trim()],
            description: [modalWordValue["description"].trim()],
            synonyms: modalWordValue["synonyms"].trim().split(' '),
            links: [null]
        }
        closeModal();
        await firebase.firestore().collection("words").doc(id).update(wordObj).then(() => {
            toast({
                title: `${wordObj.word} Updated!`,
                status: 'success',
                isClosable: true,
            })
        }).catch((err) => {
            console.log(err)
            toast({
                title: `Failed to update ${wordObj.word}!`,
                status: 'warning',
                isClosable: true,
            })
        })
    }

    const closeModal = () => {
        setEditModal(false);
    }

    return (
        <Modal
            initialFocusRef={wordInput}
            isOpen={openEditModal}
            onClose={closeModal}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit word</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isRequired>
                        <FormLabel>Word</FormLabel>
                        <Input onChange={(e) => { changeValue("word", e.target.value) }} value={modalWordValue["word"]} ref={wordInput} placeholder="Enter Word" />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                        <FormLabel>Meaning</FormLabel>
                        <Input onChange={(e) => { changeValue("meaning", e.target.value) }} value={modalWordValue["meaning"]} placeholder="Enter word's meaning" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input onChange={(e) => { changeValue("description", e.target.value) }} value={modalWordValue["description"]} placeholder="Enter word's description" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Synonyms</FormLabel>
                        <Input onChange={(e) => { changeValue("synonyms", e.target.value) }} value={modalWordValue["synonyms"]} placeholder="Enter synonyms seprated by spaces" />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={saveWord} colorScheme="blue" mr={3}>
                        Save
                    </Button>
                    <Button onClick={closeModal}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default WordList
