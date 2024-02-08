import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import TourIcon from '@mui/icons-material/Tour'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlices'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo)

  const handleRedirect = (path: string) => {
    navigate(path) // Use navigate instead of history.push
  }

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      navigate('/login') // Use navigate instead of history.push
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <TourIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          TouristApp
        </Typography>
        <Stack direction='row' spacing={2}>
          {basicUserInfo ? (
            <>
              <Button color='inherit' onClick={() => handleRedirect('/')}>
                Tourists
              </Button>
              <Button color='inherit' onClick={() => handleRedirect('/profile')}>
                Profile
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit' onClick={() => handleRedirect('/login')}>
                Login
              </Button>
              <Button color='inherit' onClick={() => handleRedirect('/register')}>
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
