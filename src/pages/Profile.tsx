import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { getUser } from '../slices/authSlices'
import Box from '@mui/material/Box'

const Profile = () => {
  const dispatch = useAppDispatch()
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo)
  const userProfileData = useAppSelector((state) => state.auth.userProfileData)
  console.log(userProfileData)
  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.Id))
    }
  }, [basicUserInfo, dispatch])
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '30vh',
        }}
      >
        <Box
          sx={{
            width: '55%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 1,
            borderColor: 'grey.500',
            borderStyle: 'solid',
            borderWidth: 1,
          }}
        >
          <img src={userProfileData?.avatar} alt='avatar' style={{ marginRight: '16px' }} />
          <div>
            <h4>{userProfileData?.name}</h4>
            <h4>{userProfileData?.email}</h4>
          </div>
        </Box>
      </Box>
    </>
  )
}

export default Profile
