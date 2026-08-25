const TONE_EDGE = {
  success: 'var(--ok)',
  warning: 'var(--warn)',
  error: 'var(--bad)',
  info: 'var(--note)',
};

export const showToast = (toast, { title, description, status = 'success', duration = 4000 }) => {
  toast.closeAll();
  toast({
    title,
    description,
    status,
    duration,
    isClosable: true,
    position: 'bottom-right',
    containerStyle: {
      borderLeft: `3px solid ${TONE_EDGE[status] || TONE_EDGE.info}`,
      boxShadow: 'var(--shadow-pop)',
    },
  });
};

export default showToast;
