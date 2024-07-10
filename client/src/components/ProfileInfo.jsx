import React from 'react'
import { getInitials } from '../utils/getInitials'

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-normal rounded-full bg-slate-100 text-slate-950 font-medium p-3
        hover:cursor-default'>
            {getInitials(userInfo?.name)}
        </div>

        <div>
            <p className='text-sm font-medium'>{userInfo?.name}</p>
            <button className='underline text-slate-700 text-sm hover:text-sky-600' onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default ProfileInfo