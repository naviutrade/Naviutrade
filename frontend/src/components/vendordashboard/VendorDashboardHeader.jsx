import React, { useState, useEffect } from 'react';
import {
    Flex,
    Text,
    useColorModeValue,
    VStack,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    HStack,
    useClipboard,
    Button,
    Avatar,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Wallet, UserPlus, MessageCircle, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../AppContext';
import axios from 'axios';
import ProductRequestModal from '../vendor/ProductRequestModal';
import { RV, rvAccentBtn, rvSecondaryBtn } from '../../theme/rv';

// AddMemberModal component (no changes)
const AddMemberModal = ({ isOpen, onClose, referralLink, onRegisterAndLogout }) => {
    const { onCopy, hasCopied } = useClipboard(referralLink);
    const linkBg = useColorModeValue('gray.100', 'gray.700');

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add a New Member</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Text textAlign="center">
                            Copy the referral link to invite a new vendor or log out to register one yourself.
                        </Text>
                        <Box p={3} bg={linkBg} borderRadius="md" w="full">
                            <HStack justify="space-between">
                                <Text fontFamily="monospace" fontSize="sm" noOfLines={1} title={referralLink} w="80%">
                                    {referralLink}
                                </Text>
                                <Button onClick={onCopy} size="sm" {...(hasCopied ? rvAccentBtn : rvSecondaryBtn)}>
                                    {hasCopied ? 'Copied' : 'Copy'}
                                </Button>
                            </HStack>
                        </Box>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button {...rvSecondaryBtn} mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button {...rvAccentBtn} onClick={onRegisterAndLogout}>
                        Log out and register
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};


const VendorDashboardHeader = ({ url }) => {
    const { user, logout, token } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isProductRequestOpen, onOpen: onProductRequestOpen, onClose: onProductRequestClose } = useDisclosure();
    
    // Debug logging for modal state
    useEffect(() => {
        console.log('=== MODAL STATE CHANGED ===');
        console.log('Modal isOpen:', isOpen);
        console.log('handleRegisterAndLogout function exists:', !!handleRegisterAndLogout);
        console.log('Function type:', typeof handleRegisterAndLogout);
    }, [isOpen]);
    const secondaryTextColor = useColorModeValue('gray.500', 'gray.400');
    const mobileButtonBg = useColorModeValue('gray.100', 'gray.700');
    const [photoUrl, setPhotoUrl] = useState(null);
    const [currentBalance, setCurrentBalance] = useState(0);

    useEffect(() => {
        const fetchPhotoUrl = async () => {
            if (!token) return;
            try {
                const res = await axios.get(`${url}/api/vendor/profile/photo-url`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPhotoUrl(res.data.passportPhotoUrl);
            } catch (error) {
                console.error("Failed to fetch photo URL for header", error);
            }
        };
        fetchPhotoUrl();
    }, [token, url]);

    // Fetch current wallet balance
    const fetchCurrentBalance = async () => {
        if (!token) return;
        try {
            const response = await fetch(`${url}/api/wallet`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setCurrentBalance(parseFloat(data.digital_money || 0));
            }
        } catch (error) {
            console.error('Failed to fetch wallet balance:', error);
        }
    };

    useEffect(() => {
        fetchCurrentBalance();
    }, [token, url]);

    const referralLink = user?.id ? `https://naviu.onrender.com/register?ref=${user.id}` : '';
    
    // Debug logging
    console.log('User object:', user);
    console.log('User ID:', user?.id);
    console.log('Referral link:', referralLink);

    const handleCopyId = () => {
        if (user?.id) {
            navigator.clipboard.writeText(user.id);
            toast({
                title: "ID Copied!",
                description: "Your referral ID has been copied to clipboard",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleRegisterAndLogout = () => {
        console.log('=== handleRegisterAndLogout FUNCTION CALLED ===');
        console.log('User object:', user);
        console.log('User ID:', user?.id);
        console.log('Token exists:', !!token);
        console.log('Referral link:', referralLink);
        console.log('Logging out and redirecting to register page...');
        
        try {
            logout();
            console.log('Logout successful, redirecting...');
            // Use the dynamic referral link instead of hardcoded URL
            const redirectUrl = referralLink || 'https://naviu.onrender.com/register';
            console.log('Redirecting to:', redirectUrl);
            window.location.href = redirectUrl;
        } catch (error) {
            console.error('Error in handleRegisterAndLogout:', error);
        }
    };

    const supportWhatsApp = process.env.REACT_APP_SUPPORT_WHATSAPP || '917075923765';

    const openWhatsApp = () => {
        if (!supportWhatsApp) return;
        const txt = `Hi, I have a question. My ID is ${user?.id || 'unknown'}.`;
        const url = `https://wa.me/${supportWhatsApp}?text=${encodeURIComponent(txt)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Grid
                templateColumns={{ base: '1fr', md: '1fr auto' }}
                gap={{ base: 4, md: 6 }}
                mb={8}
                w="100%"
                alignItems="center"
            >
                {/* --- Left Side (Unchanged) --- */}
                <GridItem>
                    <VStack align="flex-start" spacing={3}>
                        <HStack spacing={4}>
                            <Avatar size="md" name={user?.vendorName || user?.email} src={photoUrl} />
                            <VStack align="start" spacing={0} maxW="300px">
                                <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight={600} lineHeight="1.2" color={RV.ink[800]}>
                                    Hello, {user?.vendorName || user?.email?.split('@')[0] || 'Vendor'}
                                </Text>
                                {user?.id && (
                                    <Text fontSize="14px" color={RV.slate[600]} cursor="pointer" onClick={handleCopyId} _hover={{ color: RV.navy[600] }} title="Click to copy ID" fontFamily={RV.fontMono} fontVariantNumeric="tabular-nums">
                                        ID: {user.id}
                                    </Text>
                                )}
                            </VStack>
                        </HStack>
                    </VStack>
                </GridItem>

                {/* --- Right Side: Action Buttons --- */}
                <GridItem justifySelf={{ base: 'stretch', md: 'flex-end' }}>
                    <HStack
                        spacing={2}
                        w={{ base: 'full', md: 'auto' }}
                        bg={{ base: mobileButtonBg, md: 'transparent' }}
                        p={{ base: 2, md: 0 }}
                        borderRadius={{ base: 'lg', md: 0 }}
                    >
                        {/* ✅ FIX: Buttons now stack their content vertically on mobile and share space */}
                        <Button size="md" variant="ghost" onClick={() => navigate('/vendor/wallet')} flex={1} h="auto" py={2} _hover={{ bg: RV.navy[50] }}>
                            <VStack spacing={1}>
                                <Flex align="center" justify="center" w="36px" h="36px" borderRadius={RV.radius.md} bg={RV.navy[700]} color="white">
                                    <Wallet size={16} strokeWidth={1.75} />
                                </Flex>
                                <Text fontSize="13px" fontWeight={500} color={RV.ink[800]}>Wallet</Text>
                            </VStack>
                        </Button>
                        <Button size="md" variant="ghost" onClick={onOpen} flex={1} h="auto" py={2} _hover={{ bg: RV.orange[50] }}>
                             <VStack spacing={1}>
                                <Flex align="center" justify="center" w="36px" h="36px" borderRadius={RV.radius.md} bg={RV.orange[500]} color={RV.ink[900]}>
                                    <UserPlus size={16} strokeWidth={1.75} />
                                </Flex>
                                <Text fontSize="13px" fontWeight={500} color={RV.ink[800]}>Refer</Text>
                            </VStack>
                        </Button>
                        <Button size="md" variant="ghost" onClick={openWhatsApp} flex={1} h="auto" py={2} _hover={{ bg: RV.slate[100] }}>
                             <VStack spacing={1}>
                                <Flex align="center" justify="center" w="36px" h="36px" borderRadius={RV.radius.md} bg={RV.slate[100]} color={RV.navy[700]}>
                                    <MessageCircle size={16} strokeWidth={1.75} />
                                </Flex>
                                <Text fontSize="13px" fontWeight={500} color={RV.ink[800]}>Chat</Text>
                            </VStack>
                        </Button>
                         <Button size="md" variant="ghost" onClick={onProductRequestOpen} flex={1} h="auto" py={2} _hover={{ bg: RV.slate[100] }}>
                             <VStack spacing={1}>
                                <Flex align="center" justify="center" w="36px" h="36px" borderRadius={RV.radius.md} bg={RV.slate[100]} color={RV.navy[700]}>
                                    <ShoppingCart size={16} strokeWidth={1.75} />
                                </Flex>
                                 <Text fontSize="13px" fontWeight={500} color={RV.ink[800]}>Request</Text>
                             </VStack>
                         </Button>
                    </HStack>
                </GridItem>
            </Grid>

            <AddMemberModal
                isOpen={isOpen}
                onClose={onClose}
                referralLink={referralLink}
                onRegisterAndLogout={handleRegisterAndLogout}
            />
            
            <ProductRequestModal
                isOpen={isProductRequestOpen}
                onClose={onProductRequestClose}
                url={url}
                currentBalance={currentBalance}
                onRequestSuccess={() => {
                    fetchCurrentBalance();
                    onProductRequestClose();
                }}
            />

        </>
    );
};
export default VendorDashboardHeader;