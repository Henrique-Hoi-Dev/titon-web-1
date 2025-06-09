import React from 'react';
import BaseText from 'components/atoms/BaseText/BaseText';
import BaseButton from 'components/atoms/BaseButton/BaseButton';
import { styled } from '@mui/material/styles';
import { Grid, Modal as MuiModal } from '@mui/material';
import { IconClose } from 'assets/icons/icons';
import { useTranslation } from 'react-i18next';

const ModalContainer = styled(Grid, {
  shouldForwardProp: (prop) =>
    !['maxWidth', 'maxHeight', 'height', 'minheight'].includes(prop)
})(({ maxWidth, maxHeight, height, minheight }) => ({
  margin: '0 10px 0 10px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#2B2B2C',
  height: height ? height : 'auto',
  minHeight: minheight,
  maxWidth: maxWidth,
  maxHeight: maxHeight,
  padding: '10px',
  borderRadius: '20px'
}));

const CloseButtonContainer = styled(Grid, {
  shouldForwardProp: (prop) => !['isMobile'].includes(prop)
})(({ isMobile }) => ({
  display: isMobile ? 'none' : '',
  position: 'absolute',
  top: isMobile ? '3px' : '5px',
  right: isMobile ? 0 : '5px'
}));

const CloseButton = styled(BaseButton)({
  height: '40px',
  width: '20px',
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: 'transparent'
  }
});

const ContentContainer = styled(Grid, {
  shouldForwardProp: (prop) => !['sxGridModal'].includes(prop)
})(({ sxGridModal }) => ({
  ...sxGridModal,
  overflowY: 'auto'
}));

const BaseModal = ({
  title,
  sx,
  open,
  onClose,
  showReturn,
  children,
  component,
  onSubmit,
  showCloseIcon = true,
  height,
  maxWidth,
  maxHeight,
  minheight,
  sxGridModal
}) => {
  const { t } = useTranslation();

  return (
    <MuiModal open={open} onClose={() => {}}>
      <ModalContainer
        item
        container
        sx={{
          ...sx
        }}
        direction="column"
        component={component}
        onSubmit={onSubmit}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        height={height}
        minheight={minheight}
        role="dialog"
        id="modal-description"
        tabIndex={-1}
      >
        <ContentContainer
          item
          container
          justifyContent="center"
          direction="row"
          spacing={1}
          p={1}
          sxGridModal={sxGridModal}
        >
          {showCloseIcon && (
            <CloseButtonContainer item>
              <CloseButton onClick={onClose}>
                <IconClose sx={{ height: '32px' }} />
              </CloseButton>
            </CloseButtonContainer>
          )}
          <Grid item container>
            <BaseText>{title}</BaseText>
          </Grid>
          <Grid item container spacing={2} justifyContent="center">
            {children}
          </Grid>
        </ContentContainer>
        {showReturn && (
          <Grid item p={1}>
            {showReturn && (
              <BaseButton onClick={onClose}>{t('button.return')}</BaseButton>
            )}
          </Grid>
        )}
      </ModalContainer>
    </MuiModal>
  );
};

export default BaseModal;
