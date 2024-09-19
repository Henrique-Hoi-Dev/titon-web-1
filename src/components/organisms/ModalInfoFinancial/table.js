import React, { useState } from 'react'
import { Grid, Paper, TableContainer } from '@mui/material'
import { useMediaQuery } from 'react-responsive'
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody
} from 'components/atoms/BaseTable/BaseTable'
import { ModalAction } from '../ModalAction'

import InfoRow from './infoRow'
import Text from 'components/atoms/BaseText/BaseText'
import Loading from 'components/atoms/loading/loading'
import imgNotFound from '../../../assets/NotFound.png'

const Table = ({ data, isFetching, mutate, error, loading }) => {
  // const isDesktop = useMediaQuery({ maxWidth: "1400px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  const [showModalAction, setShowModalAction] = useState(false)

  const [checkId, setCheckId] = useState()

  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow>
              <SCell displaywidth={isMobile ? 1 : 0}>Status</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Final Frete</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Local Atual</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Data Atual</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Frete Bruto</SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.freight?.length > 0 && (
            <STableBody border={'true'}>
              {data?.dataResult?.freight?.map((item, i) => (
                <InfoRow
                  key={i}
                  data={item}
                  index={i}
                  setCheckId={setCheckId}
                  setShowModalAction={setShowModalAction}
                />
              ))}
            </STableBody>
          )}
        </STable>

        {(loading || isFetching) && (
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Loading />
          </Grid>
        )}

        <Grid
          item
          container
          spacing={2}
          mt={1}
          mb={1}
          alignItems="center"
          flexWrap="nowrap"
          justifyContent="center"
        >
          {data?.dataResult?.freight?.length === 0 && !isFetching && (
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              pt={5}
            >
              <Text fontSize={'28px'} center>
                RESULTADO NÃO ENCONTRADO...{' '}
                <img
                  src={imgNotFound}
                  alt="img"
                  width={'60px'}
                  style={{
                    verticalAlign: 'middle',
                    marginLeft: '20px'
                  }}
                />
              </Text>
            </Grid>
          )}

          {error && (
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              pt={5}
            >
              <Text fontSize={'28px'} center>
                ERRO
              </Text>
            </Grid>
          )}
        </Grid>
      </TableContainer>

      <ModalAction
        setShowModal={setShowModalAction}
        showModal={showModalAction}
        checkId={checkId}
        mutate={mutate}
      />
    </>
  )
}

export default Table
