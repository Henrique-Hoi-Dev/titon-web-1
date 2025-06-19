import { useEffect, useState } from 'react';
import { STablePagination } from '../BaseTable/BaseTable';

export const TablePagination = ({
  data,
  query,
  setQuery,
  allowRowsPerPage,
  arrayRowPerPage,
  labelRowsPerPage,
  justifyContent = 'center',
  sx,
}) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (data?.totalPages < data?.currentPage) {
      if (data?.dataResult === null) {
        setQuery((state) => ({
          ...state,
          page: 1,
        }));
      }
    }
  }, [data, setQuery, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setQuery((state) => ({
      ...state,
      page: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setQuery((state) => ({
      ...state,
      limit: parseInt(event.target.value, 10),
      page: 1,
    }));
  };

  const handleRowsPerPage = () => {
    return [25, 50, 100];
  };

  return (
    <STablePagination
      color="secondary"
      sx={{
        ...sx,
        display: 'flex',
        justifyContent: justifyContent,
        color: '#939395',
        '& .MuiIconButton-root': {
          width: '24px',
          height: '24px',
          minWidth: '24px',
          minHeight: '24px',
          padding: '2px',
          marginLeft: '5px',
        },
        '& .MuiTablePagination-select': {
          paddingTop: '0px',
          paddingBottom: '0px',
        },
      }}
      rowsPerPageOptions={
        allowRowsPerPage ? (arrayRowPerPage ? arrayRowPerPage : handleRowsPerPage()) : []
      }
      count={data?.total ?? 0}
      rowsPerPage={query?.limit}
      page={query?.page - 1}
      labelRowsPerPage={labelRowsPerPage}
      component="div"
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
