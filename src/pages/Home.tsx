/* eslint-disable camelcase */
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { getUser } from '../slices/authSlices'
import { useEffect, useState } from 'react'
import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import {
  Tourist,
  addTourist,
  changeStateFalse,
  changeStateTrue,
  editTourist,
  fetchTourist,
  removeTourist,
} from '../slices/touristSlices'
import TouristList from '../components/TouristList'

const Home = () => {
  const dispatch = useAppDispatch()

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo)

  const { loading, touristList, error, updateState, response, totalRecord } = useAppSelector(
    (state) => state.tourist,
  )

  const [page, setPage] = useState(0)
  console.log(page)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log('page: ' + page)
    console.log('newpage: ' + newPage)
    if (page > newPage) {
      setPage(newPage)
      dispatch(fetchTourist(newPage + 1))
    } else if (page < newPage) {
      setPage(newPage)
      dispatch(fetchTourist(newPage + 1))
    }
  }

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.Id))
      dispatch(fetchTourist(page + 1))
    }
  }, [basicUserInfo, dispatch, page])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      addTourist({
        tourist_name: name,
        tourist_email: email,
        tourist_location: location,
      }),
    )
    handleClickSnackbar()
    setName('')
    setEmail('')
    setLocation('')
  }

  const handleEditTourist = (item: Tourist) => {
    setId(item.id)
    setName(item.tourist_name)
    setEmail(item.tourist_email)
    setLocation(item.tourist_location)
    dispatch(changeStateTrue())
  }

  const updateForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      editTourist({
        id: id,
        tourist_name: name,
        tourist_email: email,
        tourist_location: location,
      }),
    )
    dispatch(changeStateFalse())
    handleClickSnackbar()
    setId('')
    setName('')
    setEmail('')
    setLocation('')
  }

  const deleteEmployee = (item: Tourist) => {
    dispatch(removeTourist(item))
    handleClickSnackbar()
    dispatch(fetchTourist(page + 1))
  }

  const [open, setOpen] = useState(false)
  const handleClickSnackbar = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const startIndex = page * 10

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 5,
          color: 'white',
        }}
      >
        <Box
          sx={{
            width: '55%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: '8px',
            }}
          >
            <TextField
              sx={{ color: 'white' }}
              variant='outlined'
              size='small'
              placeholder='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              size='small'
              placeholder='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              size='small'
              placeholder='location'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
              }}
            />
            {updateState ? (
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={(e) => {
                  updateForm(e)
                }}
              >
                Update
              </Button>
            ) : (
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={(e) => {
                  handleClick(e)
                }}
              >
                Add
              </Button>
            )}
          </Box>
          <TouristList
            loading={loading}
            touristList={touristList}
            error={error}
            totalRecord={totalRecord}
            page={page}
            handleChangePage={handleChangePage}
            handleEditTourist={handleEditTourist}
            deleteEmployee={deleteEmployee}
            startIndex={startIndex}
          ></TouristList>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
            {response === 'add'
              ? 'employee added successfully'
              : response === 'delete'
                ? 'employee delete successfully'
                : response === 'update'
                  ? 'employee update successfully'
                  : null}
          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}

export default Home
