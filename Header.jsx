import React, { useState,useEffect } from "react";
import { logout } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserTickets, reset } from '../../features/ticket/ticketSlice'
import Spinner from '../../components/Spinner'



function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
const {tickets , isLoading, isError, message } = useSelector(
  (state) => state.ticket
)



    const logoutHandler = () => {
        dispatch(logout())
    };


    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/userlogin')
        }


        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])


    if (isLoading) {
        return <Spinner />
    }



    return (
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div>
                <div>
                    <h1 className="text-2xl font-bold">GrievanceEase</h1>
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <button onClick={logoutHandler} className="mx-2 my-5 rounded-xl px-2 py-2 bg-black text-white">Logout</button>

                <img src="/images/logout.png" alt="profile" className="h-12 ml-2" />
                <img src="/images/user.png" alt="profile" className="h-12 ml-2" />
            </div>
        </nav>
    );
}

export default Header;
