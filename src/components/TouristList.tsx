import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Box,
  TableFooter,
  styled,
} from '@mui/material'
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded'
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { Tourist } from '../slices/touristSlices'
import { TouristInterface } from '../models'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination'

interface TouristListProps {
  loading: boolean
  touristList: TouristInterface[]
  error: string | null
  totalRecord: number
  page: number
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleEditTourist: (item: Tourist) => void // Replace YourTouristListType with the actual type
  deleteEmployee: (item: Tourist) => void // Replace YourTouristListType with the actual type
  startIndex: number
}

const TouristList = (props: TouristListProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: '16px',
      }}
    >
      <Table
        sx={{
          minWidth: 659,
        }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: 'black',
            }}
          >
            <TableCell align='left'>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                No
              </Typography>
            </TableCell>
            <TableCell align='left'>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                Name
              </Typography>
            </TableCell>
            <TableCell align='left'>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                Location
              </Typography>
            </TableCell>
            <TableCell align='left'>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                Event
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.loading ? <TableCell> Loading... </TableCell> : null}
          {!props.loading && props.touristList.length === 0 ? (
            <TableCell> No Records </TableCell>
          ) : null}
          {!props.loading && props.error ? <TableCell> {props.error} </TableCell> : null}
          {props.touristList &&
            props.touristList.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell align='left'>
                  <Typography> {props.startIndex + index + 1} </Typography>
                </TableCell>
                <TableCell align='left'>
                  <Typography> {item.tourist_name} </Typography>
                </TableCell>
                <TableCell align='left'>
                  <Typography> {item.tourist_location} </Typography>
                </TableCell>
                <TableCell align='left'>
                  <Box
                    sx={{
                      display: 'flex',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      sx={{
                        color: 'black',
                        mr: 1,
                      }}
                      onClick={() => props.handleEditTourist(item)}
                    >
                      <EditIcon />
                    </Box>
                    <Box
                      sx={{
                        color: 'red',
                      }}
                      onClick={() => props.deleteEmployee(item)}
                    >
                      <DeleteIcon />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <CustomTablePagination
              rowsPerPageOptions={[10]}
              colSpan={3}
              count={props.totalRecord}
              rowsPerPage={10}
              page={props.page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                  slots: {
                    firstPageIcon: FirstPageRoundedIcon,
                    lastPageIcon: LastPageRoundedIcon,
                    nextPageIcon: ChevronRightRoundedIcon,
                    backPageIcon: ChevronLeftRoundedIcon,
                  },
                },
              }}
              onPageChange={props.handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default TouristList

const blue = {
  50: '#F0F7FF',
  200: '#A5D8FF',
  400: '#3399FF',
  900: '#003A75',
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
}

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 2px 0 2px 4px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 6px; 
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 120ms ease;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
        background-color: transparent;
      }
    }
  }
  `,
)
