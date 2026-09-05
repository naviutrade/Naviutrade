import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, VStack, Heading, Text, Alert, AlertIcon, SimpleGrid,
    Image, Button, useDisclosure, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
    HStack, useToast, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    Divider, Badge, useColorModeValue
} from '@chakra-ui/react';
import { useAuth } from '../../AppContext';
import { Package } from '@phosphor-icons/react';
import VendorShell from '../../components/layout/VendorShell';
import { RV, rvAccentBtn } from '../../theme/rv';
import Money, { formatMoney } from '../../components/common/Money';
import { SkeletonGrid } from '../../components/common/Skeleton';
import EmptyState from '../../components/common/EmptyState';
import { requestLedgerRefresh } from '../../context/VendorLedgerContext';

// --- Modal Component for Wild Product Purchase Flow ---
const WildProductPurchaseModal = ({ isOpen, onClose, wildProduct, onSuccess, url, walletBalance }) => {
    const { token } = useAuth();
    const toast = useToast();

    const [quantity, setQuantity] = useState("1"); // string state for display
    const [isLoading, setIsLoading] = useState(false);

    // Reset quantity when modal opens
    useEffect(() => {
        if (isOpen) setQuantity("1"); // reset when modal opens
    }, [isOpen]);

    const handlePurchase = async () => {
        if (!wildProduct) return;

        setIsLoading(true);
        try {
            const numericQuantity = parseInt(quantity, 10) || 0;
            const response = await fetch(`${url}/api/wild-products/purchase`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    wildProductId: wildProduct.wild_product_id,
                    quantity: numericQuantity
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Purchase failed');
            }

            toast({
                title: 'Purchase successful',
                description: `You bought ${numericQuantity} units of ${wildProduct.product_name}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            onClose();
            onSuccess(); // Refresh the wild products list

        } catch (error) {
            console.error('Purchase error:', error);
            toast({
                title: 'Purchase Failed',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!wildProduct) return null;

    // convert string -> number for calculations
    const numericQuantity = parseInt(quantity, 10) || 0;
    const unitPrice = Number(wildProduct.base_price) || 0;
    const profit = Number(wildProduct.selling_price) - unitPrice;
    const totalCost = numericQuantity * unitPrice;
    const hasEnoughFunds = walletBalance >= totalCost;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="bold">Buy Elite Product: {wildProduct.product_name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="stretch" spacing={3}>
                        <Box textAlign="center">
                            <Image 
                                src={wildProduct.product_image_url} 
                                alt={wildProduct.product_name}
                                boxSize="120px"
                                objectFit="cover"
                                borderRadius="md"
                                mx="auto"
                                fallbackSrc="https://via.placeholder.com/120"
                            />
                        </Box>
                        
                        <Text fontWeight="bold">Base Price: ₹{wildProduct.base_price}</Text>
                        <Text fontSize="sm" color="gray.600">Selling Price: ₹{wildProduct.selling_price}</Text>
                        <Text fontSize="sm" fontWeight="bold" color={profit >= 0 ? "green.500" : "red.500"}>
                            Profit: ₹{profit.toFixed(2)}
                        </Text>
                        
                        <FormControl>
                            <FormLabel fontWeight="bold">Quantity to Buy:</FormLabel>
                            <NumberInput
                                min={1}
                                max={wildProduct.available_stock || 1}
                                value={quantity === "0" ? "" : quantity} // show "" instead of 0
                                onChange={(valString) => setQuantity(valString)} // keep string
                            >
                                <NumberInputField placeholder="Enter quantity" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        
                        <Divider my={2} />
                        <Heading size="md" fontWeight="bold">Total: <Money value={totalCost} /></Heading>
                        <Text fontSize="sm" color="var(--text-3)">
                            Wallet: <Money value={walletBalance} />
                        </Text>
                        {!hasEnoughFunds && (
                            <Text color="var(--bad)" fontSize="sm">
                                This purchase costs {formatMoney(totalCost)} and your balance is {formatMoney(walletBalance)}. Add {formatMoney(totalCost - walletBalance)} to continue.
                            </Text>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        {...rvAccentBtn}
                        onClick={handlePurchase}
                        isLoading={isLoading}
                        loadingText="Processing..."
                        isDisabled={!hasEnoughFunds || numericQuantity <= 0}
                        w="full"
                    >
                        Pay {formatMoney(totalCost)} with wallet
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

// --- Wild Product Card Component ---
const WildProductCard = ({ wildProduct, onBuyClick, url }) => {
    const cardBg = useColorModeValue(RV.white, 'gray.800');

    return (
        <Box 
            borderWidth="1px" 
            borderRadius={RV.radius.md}
            overflow="hidden" 
            bg={cardBg}
            borderColor={RV.slate[200]}
            _hover={{ boxShadow: RV.elev[1] }}
            transition="box-shadow 100ms cubic-bezier(.4,0,.2,1)"
        >
            <Image 
                src={wildProduct.product_image_url} 
                alt={wildProduct.product_name} 
                h="200px" 
                w="200px" 
                objectFit="cover" 
                fallbackSrc='https://via.placeholder.com/200' 
            />
            <Box p={6}>
                <Heading size="md" mb={2}>{wildProduct.product_name}</Heading>
                
                <VStack spacing={2} align="stretch" mb={4}>
                    <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Base Price:</Text>
                        <Text fontSize="sm">₹{wildProduct.base_price}</Text>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Selling Price:</Text>
                        <Text fontSize="sm">₹{wildProduct.selling_price}</Text>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Profit:</Text>
                        <Text fontSize="sm" fontWeight="bold" color={(Number(wildProduct.selling_price) - Number(wildProduct.base_price)) >= 0 ? "green.500" : "red.500"}>
                            ₹{(Number(wildProduct.selling_price) - Number(wildProduct.base_price) || 0).toFixed(2)}
                        </Text>
                    </HStack>
                </VStack>

                <HStack justify="space-between" mb={4}>
                    <Text fontSize="sm">Available:</Text>
                    <Badge colorScheme={wildProduct.available_stock > 0 ? 'green' : 'red'}>
                        {wildProduct.available_stock} units
                    </Badge>
                </HStack>

                <HStack justify="space-between" mb={4}>
                    <Text fontSize="sm">Selling Days:</Text>
                    <Badge colorScheme="orange" variant="subtle">{wildProduct.selling_date_count || 30} days</Badge>
                </HStack>

                <Button 
                    w="full" 
                    {...rvAccentBtn}
                    onClick={() => onBuyClick(wildProduct)}
                    isDisabled={wildProduct.available_stock === 0}
                >
                    {wildProduct.available_stock === 0 ? 'Out of stock' : `Buy stock · ${formatMoney(wildProduct.base_price)}`}
                </Button>
            </Box>
        </Box>
    );
};

// --- Main Wild Product Trading Page Component ---
const WildProductTradingPage = ({ url }) => {
    const { token } = useAuth();
    const toast = useToast();
    const [wildProducts, setWildProducts] = useState([]);
    const [selectedWildProduct, setSelectedWildProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    const fetchWildProducts = useCallback(async () => {
        setLoading(true);
        if (!token) { 
            setError("You must be logged in."); 
            setLoading(false); 
            return; 
        }
        try {
            const [wildProductsRes, walletRes] = await Promise.all([
                fetch(`${url}/api/wild-products/available`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${url}/api/wallet`, { headers: { Authorization: `Bearer ${token}` } })
            ]);
            if (!wildProductsRes.ok) throw new Error('Failed to fetch elite products.');
            if (!walletRes.ok) throw new Error('Failed to fetch wallet balance.');
            const wildProductsData = await wildProductsRes.json();
            const walletData = await walletRes.json();
            
            // Handle new API response structure with time constraints
            if (wildProductsData.success === false) {
                // Wild products not available due to time constraints
                toast({ 
                    title: 'Elite Products Not Available',
                    description: String(wildProductsData.message || '').replace(/Wild/g, 'Elite').replace(/wild/g, 'elite'),
                    status: 'warning', 
                    isClosable: true,
                    duration: 5000
                });
                setWildProducts([]);
            } else {
                // Wild products available - extract from new response structure
                setWildProducts(wildProductsData.products || wildProductsData || []);
            }
            setWalletBalance(Number(walletData.digital_money) || 0);
        } catch (err) { 
            setError(err.message); 
        } finally { 
            setLoading(false); 
        }
    }, [token, url, toast]);


    useEffect(() => {
        fetchWildProducts();
    }, [token, fetchWildProducts]);

    const handleBuyClick = (wildProduct) => {
        setSelectedWildProduct(wildProduct);
        onModalOpen();
    };

    return (
        <VendorShell title="Elite products" url={url}>
                {loading && wildProducts.length === 0 ? (
                    <SkeletonGrid count={6} />
                ) : error ? (
                    <Alert status="error" borderRadius="var(--r-structure)" bg="var(--bad-bg)" border="1px solid" borderColor="var(--bad-bd)" color="var(--bad)">
                        <AlertIcon color="var(--bad)" />
                        {error}
                    </Alert>
                ) : wildProducts.length === 0 ? (
                    <EmptyState
                      icon={Package}
                      headline="No elite products available"
                      body="Nothing is listed right now. Refresh to check again."
                      actionLabel="Refresh"
                      onAction={fetchWildProducts}
                    />
                ) : (
                    <Box>
                        <Text mb={6} color={RV.slate[700]}>
                            Exclusive elite products. Pay from wallet.
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                            {wildProducts.map(wildProduct => (
                                <WildProductCard
                                    key={wildProduct.wild_product_id}
                                    wildProduct={wildProduct}
                                    onBuyClick={handleBuyClick}
                                    url={url}
                                />
                            ))}
                        </SimpleGrid>
                    </Box>
                )}

                {selectedWildProduct && (
                    <WildProductPurchaseModal
                        isOpen={isModalOpen}
                        onClose={onModalClose}
                        wildProduct={selectedWildProduct}
                        onSuccess={() => {
                            fetchWildProducts();
                            requestLedgerRefresh();
                        }}
                        url={url}
                        walletBalance={walletBalance}
                    />
                )}
        </VendorShell>
    );
};

export default WildProductTradingPage;
