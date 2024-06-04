import * as React from 'react'
import { moneyMask } from 'utils/masks'
import { CardMedia, Grid } from '@mui/material'
import { IconMenuTruck } from 'assets/icons/icons'
import { formatDate } from 'utils/formatDate'
import { useTranslation } from 'react-i18next'
import { BaseTypeStatus } from 'components/molecules/BaseTypeStatus/BaseTypeStatus'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Text from '../../../components/atoms/BaseText/BaseText'

const CardInfoValues = ({ props, styles, onClick }) => {
  const { t } = useTranslation()

  return (
    <Grid
      item
      sx={{
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Card
        sx={{
          minWidth: '300px!important',
          minHeight: '360px!important',
          background: '#1C1C1C',
          borderRadius: '8px'
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '0px!important'
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              fontSize: '1.2rem',
              ...styles
            }}
          >
            <CardMedia
              component="img"
              height="190px"
              sx={{ borderRadius: '8px' }}
              image={props?.truck_avatar}
              alt="green iguana"
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
              lineHeight: '25px'
            }}
          >
            <Grid container item pb={2} justifyContent={'space-between'}>
              <Text fontsize={'24px'} color="#F1F3F9">
                {props?.truck_board.toUpperCase()}
              </Text>
              <BaseTypeStatus props={props?.freigth} />
            </Grid>

            <Grid container justifyContent={'space-between'}>
              <Text fontsize={'16px'}>{t('card_financial.label1')} </Text>
              <Text fontsize={'16px'}>{props?.driver_name}</Text>
            </Grid>

            <Grid container justifyContent={'space-between'}>
              <Text fontsize={'16px'}>{t('card_financial.label2')} </Text>
              <Text fontsize={'16px'}>{formatDate(props?.start_date)}</Text>
            </Grid>

            <Grid container justifyContent={'space-between'}>
              <Text fontsize={'16px'}>{t('card_financial.label3')} </Text>
              <Text fontsize={'16px'}>
                {props?.freight[0]?.final_freight_city.toUpperCase()}
              </Text>
            </Grid>

            <Grid container justifyContent={'space-between'}>
              <Text fontsize={'16px'}>{t('card_financial.label4')} </Text>
              <Text fontsize={'16px'}>
                {moneyMask(props?.driver?.credit || [0])}
              </Text>
            </Grid>

            <Grid
              container
              justifyContent={'flex-start'}
              alignItems={'flex-end'}
            >
              <IconMenuTruck
                sx={{ fontSize: '30px', color: '#509BFB', mr: 1 }}
              />
              <Text fontsize={'16px'} sx={{ verticalAlign: 'super' }}>
                {props.cart_models}
              </Text>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default CardInfoValues
