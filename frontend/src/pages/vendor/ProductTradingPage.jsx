// src/pages/ProductTradingPage.jsx

import React, { useState, useEffect } from 'react';
import {
    Box, VStack, Heading, Text, Spinner, Alert, AlertIcon, SimpleGrid,
    Container, Image, Button, useDisclosure, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Input, HStack, useToast, FormControl, FormLabel,
    Divider
} from '@chakra-ui/react';
import { useAuth } from '../../AppContext';
import VendorShell from '../../components/layout/VendorShell';
import { RV, rvAccentBtn, rvPrimaryBtn } from '../../theme/rv';
import { requestLedgerRefresh } from '../../context/VendorLedgerContext';


// --- Modal Component for the entire Purchase Flow ---
// This modal now handles both steps: quantity selection and payment proof.
const PurchaseModal = ({ isOpen, onClose, product, onSuccess, url }) => {
    const { token } = useAuth();
    const toast = useToast();

    // Internal state for the modal's flow
    const [step, setStep] = useState('quantity'); // 'quantity' or 'payment'
    const [quantity, setQuantity] = useState(1);
    const [tradeDetails, setTradeDetails] = useState(null); // To store { trade_id, total_amount_paid }
    const [transactionId, setTransactionId] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    // This effect RESETS the modal to the first step every time it's opened.
    useEffect(() => {
        if (isOpen) {
            setStep('quantity');
            setQuantity(1);
            setTransactionId('');
    
            setTradeDetails(null);
        }
    }, [isOpen]);

    // Step 1: User confirms quantity and proceeds.
    const handleInitiatePayment = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}/api/trading/initiate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    productId: product.product_id,
                    no_of_stock_bought: parseInt(quantity, 10)
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            // Success! Store the trade details and switch the modal's view.
            setTradeDetails(data.tradeDetails);
            setStep('payment');

        } catch (err) {
            toast({ title: 'Error', description: err.message, status: 'error', isClosable: true });
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: User submits the payment proof form.
    const handleProofSubmit = async (e) => {
        e.preventDefault();
        if (!transactionId) {
            toast({ title: 'Missing Information', description: 'Please provide a transaction ID.', status: 'warning', isClosable: true });
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('tradeId', tradeDetails.trade_id);
        formData.append('transactionId', transactionId);

        try {
            const response = await fetch(`${url}/api/trading/submit-proof`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            toast({ title: 'Submission successful', description: data.message, status: 'success', isClosable: true });
            onSuccess();
            requestLedgerRefresh();
            onClose();
            
        } catch (err) {
            toast({ title: 'Submission Failed', description: err.message, status: 'error', isClosable: true });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleProofSubmit} bg="gray.800" color="white">
                <ModalHeader>
                    {step === 'quantity' ? `Buy Stock: ${product?.paper_type}` : 'Complete Your Payment'}
                </ModalHeader>
                <ModalCloseButton />

                {/* --- The Modal Body now renders content based on the 'step' state --- */}
                <ModalBody>
                    {step === 'quantity' && (
                        <VStack spacing={4}>
                            <Text>Price per Slot: ₹{product?.price_per_slot}</Text>
                            <HStack w="full">
                                <Text>Quantity to Buy:</Text>
                                <Input 
                                    type="number" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    min={1}
                                    max={product?.quota_phase === 'personal_quota' 
                                        ? product?.vendor_remaining_quota 
                                        : product?.available_stock}
                                />
                            </HStack>
                            <Divider />
                            <Text fontWeight="bold" fontSize="lg">
                                Total Cost: ₹{(quantity * (product?.price_per_slot || 0)).toFixed(2)}
                            </Text>
                        </VStack>
                    )}

                    {step === 'payment' && (
                        <VStack spacing={4}>
                            <Alert status='info' borderRadius="md" variant="subtle">
                                <AlertIcon />
                                <Text fontWeight="bold">Amount to Pay: ₹{tradeDetails?.total_amount_paid.toFixed(2)}</Text>
                            </Alert>
                            <Image src="/images/payment-qr-code.png" alt="Payment QR Code" boxSize="180px" bg="white" p={2} borderRadius="md" />
                            <FormControl isRequired>
                                <FormLabel>Transaction ID</FormLabel>
                                <Input placeholder="Enter the UPI/Bank transaction ID" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
                            </FormControl>

                        </VStack>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>Cancel</Button>
                    {step === 'quantity' ? (
                        <Button {...rvAccentBtn} onClick={handleInitiatePayment} isLoading={isLoading}>
                            Proceed to payment
                        </Button>
                    ) : (
                        <Button {...rvPrimaryBtn} type="submit" isLoading={isLoading}>
                            Submit and complete payment
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};


// --- Product Card Component ---
const ProductCard = ({ product, onBuyClick, url }) => {
    // Check if product is in personal quota phase
    const isPersonalQuota = product.quota_phase === 'personal_quota';
    
    console.log(`🔍 [FRONTEND] ProductCard for ${product.product_id}:`, {
        quota_phase: product.quota_phase,
        isPersonalQuota: isPersonalQuota,
        available_stock: product.available_stock,
        vendor_remaining_quota: product.vendor_remaining_quota,
        vendor_quota: product.vendor_quota,
        vendor_purchased: product.vendor_purchased
    });
    
    const displayUnits = isPersonalQuota ? product.vendor_remaining_quota : product.available_stock;
    console.log(`🔍 [FRONTEND] Will display: ${displayUnits} units`);

    const sellingDaysRaw = product.selling_days ?? product.sellingDays ?? product.selling_days_count ?? product.sellingDaysCount;
    const sellingDays = (() => {
        if (sellingDaysRaw === undefined || sellingDaysRaw === null || sellingDaysRaw === '') {
            return 7;
        }
        const parsed = Number(sellingDaysRaw);
        return Number.isNaN(parsed) || parsed <= 0 ? 7 : parsed;
    })();
    
    return (
        <Box borderWidth="1px" borderColor={RV.slate[200]} borderRadius={RV.radius.md} overflow="hidden" bg={RV.white}>
            <Image src={`${url}${product.product_image_url}`} alt={product.paper_type} h="200px" w="full" objectFit="cover" fallbackSrc='https://via.placeholder.com/300' />
            <Box p={6}>
                <Heading as="h3" size="md" color={RV.ink[800]}>{product.paper_type}</Heading>
                <Text mt={2} color={RV.slate[700]}>Size: {product.size} | GSM: {product.gsm}</Text>
                
                <Text mt={2} color={RV.slate[700]}>
                    Available: <Text as="span" color={RV.success} fontWeight="600" fontVariantNumeric="tabular-nums">
                        {displayUnits} units
                    </Text>
                </Text>

                <Text mt={2} color={RV.orange[700]} fontWeight="500">
                    Selling days: {sellingDays}
                </Text>
                
                <Text fontSize="xl" fontWeight="600" color={RV.navy[700]} mt={2} fontVariantNumeric="tabular-nums">₹{product.price_per_slot} / slot</Text>
                <Button mt={4} w="full" {...rvAccentBtn} onClick={() => onBuyClick(product)}>Buy stock</Button>
            </Box>
        </Box>
    );
};

// --- Main Page Component ---
// This is now much simpler. It just displays products and opens the modal.
const ProductTradingPage = ({ url }) => {
  const { token } = useAuth();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchProducts = async () => {
    setLoading(true);
    if (!token) { setError("You must be logged in."); setLoading(false); return; }
    try {
      const response = await fetch(`${url}/api/products/available`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!response.ok) throw new Error('Failed to fetch products.');
      const data = await response.json();
      
      console.log('🔍 [FRONTEND] API Response:', data);
      console.log('🔍 [FRONTEND] Products array:', data.products || data);
      
      // Handle new API response structure with time constraints
      if (data.success === false) {
        // Products not available due to time constraints
        toast({ 
          title: 'Products Not Available', 
          description: data.message, 
          status: 'warning', 
          isClosable: true,
          duration: 5000
        });
        setProducts([]);
      } else {
        // Products available - extract from new response structure
        const productsArray = data.products || data || [];
        console.log('🔍 [FRONTEND] Setting products:', productsArray);
        setProducts(productsArray);
      }
    } catch (err) { 
      console.error('❌ [FRONTEND] Error fetching products:', err);
      setError(err.message); 
    } finally { 
      setLoading(false); 
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
  <VendorShell title="Product trading" url={url}>
      {loading && products.length === 0 ? (
        <Container centerContent><Spinner size="xl" mt="20" color={RV.navy[700]} /></Container>
      ) : error ? (
        <Container centerContent><Alert status="error" mt="20" bg={RV.errorBg} borderColor={RV.errorBorder} color={RV.error}><AlertIcon color={RV.error} />{error}</Alert></Container>
      ) : (
        <Container maxW="100%" py={4} px={0}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {products.map(product => (
              <ProductCard
                key={product.product_id}
                product={product}
                onBuyClick={handleBuyClick}
                url={url}
              />
            ))}
          </SimpleGrid>
        </Container>
      )}

      {selectedProduct && (
        <PurchaseModal
          isOpen={isOpen}
          onClose={onClose}
          product={selectedProduct}
          onSuccess={fetchProducts}
          url={url}
        />
      )}
  </VendorShell>
);

};

export default ProductTradingPage;