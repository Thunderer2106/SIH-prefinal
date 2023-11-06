import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/user/userSlice'
import Spinner from '../../components/Spinner'


export default function LoginUser() {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  })

  const { phone, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/userdashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])



  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()


    const userData = {
      phone,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }


 

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      {/* <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src='./images/gov.jpg'
        alt="/"
      /> */}

      <div className="flex justify-center items-center h-full">
        <form className="max-w-[400px] w-full mx-auto bg-white p-8" onSubmit={onSubmit}>
          <h2 className="text-4xl font-bold text-center py-4">BRAND.</h2>

          <div className="flex flex-col mb-4">
            <label>Phone</label>
            <input className="border relative bg-gray-100 p-2" type="text"
              id='phone'
              name='phone'
              value={phone}
              placeholder="ID"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col ">
            <label>OTP</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="password"
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}


            />
          </div>
          <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white">
            Go In
          </button>
        </form>
      </div>
    </div>
  );
}
