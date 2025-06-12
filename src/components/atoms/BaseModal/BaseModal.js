import React from 'react';
import { Modal, Box } from '@mui/material';

const BaseModal = ({ children, showModal, setShowModal, ...props }) => {
  return (
    <Modal open={showModal} onClose={() => setShowModal(false)} {...props}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '600px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default BaseModal;
