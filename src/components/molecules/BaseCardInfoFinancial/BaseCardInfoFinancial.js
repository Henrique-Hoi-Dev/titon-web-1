import React, { useEffect, useRef } from 'react'
import { Box, Card, Grid, CardMedia } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { moneyMask } from 'utils/masks'
import { IconMenuTruck } from 'assets/icons/icons'
import { formatDate } from 'utils/formatDate'
import { useTranslation } from 'react-i18next'

import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import BaseNotFound from 'components/molecules/BaseNotFound/BaseNotFound'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseText from 'components/atoms/BaseText/BaseText'
import BaseTypeStatus from 'components/molecules/BaseTypeStatus/BaseTypeStatus'

const BaseCardInfoFinancial = ({ loading, financials }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
  }, [])

  const getAvatar = (id, category) => {
    if (id) {
      return `https://titon-file-storage.s3.us-east-1.amazonaws.com/${category}/${id}`
    }
    return 'https://titon-file-storage.s3.us-east-1.amazonaws.com/images-public/exemple-truck.webp'
  }

  return (
    <>
      <Grid item container justifyContent={'flex-start'}>
        {financials?.docs?.length > 0 && (
          <Box
            sx={{
              minHeight: '385px',
              width: '100%',
              display: 'flex',
              overflowX: 'auto',
              justifyContent: 'flex-start',
              '& > :not(style)': {
                margin: '10px',
              },
            }}
          >
            {financials?.docs?.map((financial) => (
              <Grid
                item
                key={financial?.id}
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/info-financial/${financial?.id}`)}
              >
                <Card
                  sx={{
                    minWidth: '300px!important',
                    minHeight: '360px!important',
                    background: '#1C1C1C',
                    borderRadius: '8px',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      paddingBottom: '0px!important',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        fontSize: '1.2rem',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="190px"
                        sx={{ borderRadius: '8px' }}
                        image={getAvatar(
                          financial?.truck?.imageTruck?.uuid,
                          financial?.truck?.imageTruck?.category
                        )}
                        alt="image_truck"
                      />
                    </Typography>

                    <Grid
                      item
                      container
                      p={'16px  0 16px'}
                      mt={1}
                      height="100%"
                      gap={1}
                      flexDirection={'column'}
                      sx={{
                        color: '#CCD6EB',
                        lineHeight: '25px',
                      }}
                    >
                      <Grid container item pb={2} justifyContent={'space-between'}>
                        <BaseText fontsize={'24px'} color="#F1F3F9">
                          {financial?.truck?.truckBoard?.toUpperCase() || '-'}
                        </BaseText>
                        <BaseTypeStatus props={financial?.freight} />
                      </Grid>

                      <Grid container justifyContent={'space-between'}>
                        <BaseText fontsize={'16px'}>{t('card_financial.label1')} </BaseText>
                        <BaseText fontsize={'16px'}>{financial?.driver?.name || '-'}</BaseText>
                      </Grid>

                      <Grid container justifyContent={'space-between'}>
                        <BaseText fontsize={'16px'}>{t('card_financial.label2')} </BaseText>
                        <BaseText fontsize={'16px'}>
                          {formatDate(financial?.startDate) || '-'}
                        </BaseText>
                      </Grid>

                      <Grid container justifyContent={'space-between'}>
                        <BaseText fontsize={'16px'}>{t('card_financial.label3')} </BaseText>
                        <BaseText fontsize={'16px'}>
                          {financial?.freight?.[0]?.finalFreightCity?.toUpperCase() || '-'}
                        </BaseText>
                      </Grid>

                      <Grid container justifyContent={'space-between'}>
                        <BaseText fontsize={'16px'}>{t('card_financial.label4')} </BaseText>
                        <BaseText fontsize={'16px'}>
                          {moneyMask(financial?.driver?.credit || 0)}
                        </BaseText>
                      </Grid>

                      <Grid container justifyContent={'flex-start'} alignItems={'flex-end'}>
                        <IconMenuTruck sx={{ fontSize: '30px', color: '#509BFB', mr: 1 }} />
                        <BaseText fontsize={'16px'} sx={{ verticalAlign: 'super' }}>
                          {financial?.cart?.cartModels || '-'}
                        </BaseText>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
        )}
      </Grid>

      {financials?.docs?.length === 0 && <BaseNotFound />}

      {loading && <BaseLoading color={'white'} />}
    </>
  )
}

export default BaseCardInfoFinancial
