import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Button, Spinner, Text, useToast, Heading, SimpleGrid,
  Avatar, Flex, Input, Center, useDisclosure, HStack,
} from '@chakra-ui/react';
import { SignOut, Camera, IdentificationCard, Bank, EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react';
import axios from 'axios';
import { useAuth } from '../../AppContext';
import VendorShell from '../../components/layout/VendorShell';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import Alert from '../../components/common/Alert';
import { showToast } from '../../components/common/toast';
import { rvAccentBtn, rvSecondaryBtn, rvPrimaryBtn } from '../../theme/rv';

const Field = ({ label, value, mono = false }) => (
  <Box as="dl" py={3} borderBottom="1px solid" borderColor="var(--hairline)" m={0}>
    <Text
      as="dt"
      fontSize="12px"
      fontWeight={600}
      letterSpacing="0.04em"
      textTransform="uppercase"
      color="var(--text-3)"
      mb="4px"
    >
      {label}
    </Text>
    <Text
      as="dd"
      m={0}
      fontWeight={500}
      color="var(--text)"
      fontFamily={mono ? 'var(--f-num)' : 'var(--f-body)'}
      fontSize={mono ? '15px' : '15px'}
      noOfLines={3}
      title={value || undefined}
    >
      {value || '—'}
    </Text>
  </Box>
);

const SectionCard = ({ icon: Icon, title, hint, children }) => (
  <Box
    bg="var(--panel)"
    border="1px solid"
    borderColor="var(--border)"
    borderRadius="var(--r-structure)"
    p={{ base: 5, md: 6 }}
    h="100%"
  >
    <Flex align="center" gap={2} mb={1}>
      <Box color="var(--brand)">
        <Icon size={20} weight="bold" />
      </Box>
      <Heading
        as="h2"
        fontSize="17px"
        fontWeight={600}
        letterSpacing="0.06em"
        textTransform="uppercase"
        m={0}
      >
        {title}
      </Heading>
    </Flex>
    {hint && (
      <Text fontSize="13.5px" color="var(--text-3)" mb={3}>
        {hint}
      </Text>
    )}
    {children}
  </Box>
);

const VendorProfile = ({ url }) => {
  const { token, logout } = useAuth();
  const toast = useToast();
  const { isOpen: isPhotoOpen, onOpen: onPhotoOpen, onClose: onPhotoClose } = useDisclosure();
  const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();

  const [profile, setProfile] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/api/vendor/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        showToast(toast, { title: 'Could not load profile', description: 'Try again in a moment.', status: 'error' });
      }
    };
    if (token) fetchProfile();
  }, [url, toast, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setNewImageFile(null);
    setPreviewUrl(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    onPhotoClose();
    if (!newImageFile) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('profileImage', newImageFile);
      const res = await axios.post(`${url}/api/vendor/profile-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      setProfile((prev) => ({ ...prev, passportPhotoUrl: res.data.imageUrl }));
      setNewImageFile(null);
      setPreviewUrl(null);
      setIsEditing(false);
      showToast(toast, { title: 'Photo updated', status: 'success' });
    } catch (err) {
      showToast(toast, {
        title: 'Update failed',
        description: err?.response?.data?.message || 'Could not save the photo.',
        status: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const photoSrc = previewUrl || profile?.passportPhotoUrl || '';

  return (
    <VendorShell
      title="Profile"
      url={url}
      actions={
        profile ? (
          <Button variant="rvDanger" leftIcon={<SignOut size={16} weight="bold" />} onClick={onLogoutOpen}>
            Log out
          </Button>
        ) : null
      }
    >
      {!profile ? (
        <Center h="220px"><Spinner size="xl" color="var(--brand)" /></Center>
      ) : (
        <Box w="100%">
          <Box
            className="rv-cut-lg"
            bg="var(--panel)"
            border="1px solid"
            borderColor="var(--border)"
            borderRadius="var(--r-structure)"
            p={{ base: 5, md: 6 }}
            mb={6}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'center', md: 'flex-start' }}
              gap={{ base: 5, md: 8 }}
            >
              <Box position="relative" flexShrink={0}>
                <Avatar
                  size="2xl"
                  name={profile.vendorName}
                  src={photoSrc}
                  border="2px solid"
                  borderColor="var(--border)"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  display="none"
                />
              </Box>

              <Box flex="1" minW={0} textAlign={{ base: 'center', md: 'left' }} w="100%">
                <Text
                  fontFamily="var(--f-display)"
                  fontWeight={700}
                  fontSize="26px"
                  lineHeight="30px"
                  letterSpacing="-0.02em"
                  color="var(--text)"
                  mb={2}
                >
                  {profile.vendorName || 'Vendor'}
                </Text>
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  gap={{ base: 1, sm: 5 }}
                  justify={{ base: 'center', md: 'flex-start' }}
                  color="var(--text-2)"
                  fontSize="15px"
                  mb={5}
                >
                  <Flex align="center" gap={2} justify="center">
                    <EnvelopeSimple size={16} />
                    <Text noOfLines={1}>{profile.email || '—'}</Text>
                  </Flex>
                  <Flex align="center" gap={2} justify="center">
                    <Phone size={16} />
                    <Text fontFamily="var(--f-num)">{profile.phoneNumber || '—'}</Text>
                  </Flex>
                </Flex>

                <HStack spacing={2} justify={{ base: 'center', md: 'flex-start' }} flexWrap="wrap">
                  {!isEditing ? (
                    <Button {...rvAccentBtn} leftIcon={<Camera size={16} />} onClick={() => setIsEditing(true)}>
                      Edit photo
                    </Button>
                  ) : (
                    <>
                      <Button variant="rvQuiet" onClick={() => fileInputRef.current?.click()}>
                        Choose file
                      </Button>
                      <Button {...rvSecondaryBtn} onClick={handleCancel}>Cancel</Button>
                      <Button
                        {...rvPrimaryBtn}
                        onClick={onPhotoOpen}
                        isDisabled={!newImageFile || isSaving}
                        isLoading={isSaving}
                      >
                        Save photo
                      </Button>
                    </>
                  )}
                </HStack>
                {isEditing && newImageFile && (
                  <Text fontSize="13.5px" color="var(--text-3)" mt={2}>
                    {newImageFile.name} selected. Save to apply.
                  </Text>
                )}
              </Box>
            </Flex>
          </Box>

          <Alert tone="note" title="Read-only records">
            KYC and bank details cannot be edited here. Contact support if something is wrong.
          </Alert>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt={6}>
            <SectionCard icon={IdentificationCard} title="KYC" hint="Used for withdrawals and compliance.">
              <Field label="Aadhar number" value={profile.aadharNumber} mono />
              <Field label="PAN card" value={profile.panCardNumber} mono />
              <Box pt={1}>
                <Flex align="center" gap={2} color="var(--text-3)" mb="4px" mt={3}>
                  <MapPin size={14} />
                  <Text fontSize="12px" fontWeight={600} letterSpacing="0.04em" textTransform="uppercase">
                    Address
                  </Text>
                </Flex>
                <Text fontSize="15px" color="var(--text)" whiteSpace="pre-wrap">
                  {profile.address || '—'}
                </Text>
              </Box>
            </SectionCard>

            <SectionCard icon={Bank} title="Bank" hint="Payouts go to this account.">
              <Field label="Bank name" value={profile.bankName} />
              <Field label="Account number" value={profile.accountNumber} mono />
              <Field label="IFSC code" value={profile.ifscCode} mono />
            </SectionCard>
          </SimpleGrid>

          <Box
            mt={6}
            bg="var(--panel)"
            border="1px solid"
            borderColor="var(--border)"
            borderRadius="var(--r-structure)"
            p={{ base: 5, md: 6 }}
          >
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              align={{ base: 'stretch', sm: 'center' }}
              justify="space-between"
              gap={4}
            >
              <Box>
                <Heading as="h2" fontSize="17px" fontWeight={600} letterSpacing="0.06em" textTransform="uppercase" mb={1}>
                  Session
                </Heading>
                <Text fontSize="13.5px" color="var(--text-3)">
                  Sign out of this device. You can log in again at any time.
                </Text>
              </Box>
              <Button
                variant="rvDanger"
                leftIcon={<SignOut size={16} weight="bold" />}
                onClick={onLogoutOpen}
                alignSelf={{ base: 'stretch', sm: 'center' }}
              >
                Log out
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      <ConfirmationModal
        isOpen={isPhotoOpen}
        onClose={onPhotoClose}
        onConfirm={handleSave}
        title="Save photo"
        message="Replace the current profile photo with the new file?"
        confirmText="Save photo"
        confirmVariant="rvSolid"
        isLoading={isSaving}
        alertType="note"
      />
      <ConfirmationModal
        isOpen={isLogoutOpen}
        onClose={onLogoutClose}
        onConfirm={logout}
        title="Log out"
        message="You will need to sign in again to use the vendor console."
        confirmText="Log out"
        confirmVariant="rvDanger"
        alertType="warning"
      />
    </VendorShell>
  );
};

export default VendorProfile;
