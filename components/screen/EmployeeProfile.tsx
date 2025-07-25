import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import PopUp from 'components/elements/PopUp';
import axios from 'axios';
import { API_URL } from 'context/env';
import { useAuth } from 'context/AuthContext';
export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  bio: string | null;
  department: string | null;
  workingAs:  string | null;
  dob: string | null;
  employeeId: string | null;
  image: string | null;
  phone: string | null;
}

const EmployeeProfile = ({data, handleSubmit, setInput, input, updating}: {data: Employee, handleSubmit: (title: string) => void, setInput: any, input: string, updating: boolean}) => {

  const [isPopUp, setPopUp] = useState(false)
  const [title, setTitle] = useState("")
  const [pass, setPass] = useState(false);

  const handleClick = (val: string) => {
    const value = val.toLowerCase()
    const userData = data[value] ? data[value] : "" 
    setTitle(val)
    setInput(userData)
    setPopUp(true)
  }
    const fist_letter = data.name[0]
  const last_letter = data.name.split(" ")[1][0]
  const final_name = fist_letter + last_letter

  const close = () => setPopUp(!isPopUp)
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} className='relative'>
      {
        isPopUp &&
       <PopUp input={input} title={title} clickAction={() => handleSubmit(title)} setInput={setInput} close={close} loading={updating}/>
      }
      {
        pass &&
        <ChangePass close={() => setPass(!pass)}/>
      }
      <View className='w-full h-16 rotate-45 absolute z-50 inset-0 top-6 bg-pup-dark rounded-br-full -left-32 flex justify-center items-center'><Text className='text-pup-100 text-center font-grotesk-medium text-xl'>The RD group of industries</Text></View>
      <View className='w-full h-16 -rotate-45 absolute -z-50 inset-0 top-6 bg-pup-dark rounded-br-full left-32 flex justify-center items-center'><Text className='text-pup-100 text-center font-grotesk-medium text-xl'>The RD group of industries</Text></View>
    
        <View className='w-[90%] h-full flex justify-center mt-[4.5rem] items-end'>
        {/* I CARD */}
          <View className='w-full h-[70%] bg-white rounded-3xl relative overflow-hidden flex justify-end items-center'>
            {/* UPPER PART */}
            <View className='w-full h-1/2 bg-pup-100 rounded-full rounded-t-none absolute -top-14 flex justify-end items-center'>
              <View className='w-36 h-36 mb-2 rounded-full border-2 border-white/40 bg-white flex justify-center items-center  relative'>
              <TouchableOpacity className='w-8 h-8 bg-white absolute rounded-full bottom-2 right-2 z-50 flex justify-center items-center'>
            <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
              </TouchableOpacity>
                          {
                            data.image ? (
                <Image 
                source={{uri: data?.image ? data.image : `https://picsum.photos/1080/2000`}}
                className='w-full h-full rounded-full object-cover'
                />
                            ) : (
                              <Text className='text-6xl font-grotesk-medium text-black'>{final_name}</Text>
                            )
                          }

              </View>
            </View>
            {/* CENTER GAP FOR RIBBON */}
            <View className='w-full h-6 absolute top-3 flex justify-center items-center'>
              <View className='w-1/3 h-full bg-primary-bg rounded-full'></View>
            </View>

            {/* LOWER PART */}
            <View className='w-full h-[22rem]'>
              <Text className='font-grotesk-semibold text-center text-4xl tracking-tighter'>{data.name}</Text>
              <Text className='font-dm-regular text-center text-xl text-neutral-400 tracking-tighter'>{data?.workingAs} • {data?.department}</Text>
            
            <View className='mt-2 px-4'>
            <Text className='font-dm-semibold text-lg text-gray-600 mb-2'>Bio - <Text className='font-dm-light text-sm tracking-tighter leading-none'>{data?.bio}</Text>
            {"  "}
            <TouchableOpacity onPress={() => handleClick("Bio")}>
            <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
            </TouchableOpacity>
            </Text> 
            <Text className='font-dm-semibold my-1 text-lg text-gray-600'>Employee Id - <Text className='font-dm-regular text-base tracking-tighter leading-none'>{data?.employeeId}</Text></Text>
            <Text className='font-dm-semibold my-1 text-lg text-gray-600'>DOB - <Text className='font-dm-regular text-base tracking-tighter leading-none'>{data?.dob}</Text></Text>
            <Text className='font-dm-semibold my-1 text-lg text-gray-600'>Phone - <Text className='font-dm-regular text-base tracking-tighter leading-none'>{data?.phone}</Text>
                        {"  "}
            <TouchableOpacity onPress={() => handleClick("Phone")}>
            <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
            </TouchableOpacity>
            </Text>
            <Text className='font-dm-semibold my-1 text-lg text-gray-600'>Email - <Text className='font-dm-regular text-base tracking-tighter leading-none'>{data?.email}</Text>
                        {"  "}
            <TouchableOpacity onPress={() => handleClick("Email")}>
            <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
            </TouchableOpacity>
            </Text>
        <View className='flex flex-row'>

        <TouchableOpacity onPress={() => setPass(!pass)}>
            <Text className='font-dm-semibold my-4 text-sm text-pup-100'>Change Password</Text>
        </TouchableOpacity>
            <Text className='font-dm-semibold my-4 text-sm text-black'> | </Text>
                <TouchableOpacity>
            <Text className='font-dm-semibold my-4 text-sm text-red-400'>Logout</Text>
        </TouchableOpacity>
        </View>
            
            </View>
            </View>
          </View>
          {/* <TouchableOpacity className='w-full py-4 rounded-xl bg-pup-100 my-4'>
            <Text className='text-white text-center text-xl font-grotesk-medium'>Logout</Text>
            </TouchableOpacity> */}
        </View>
    </View>
  )
}


const ChangePass = ({close}: {
  close: any
}) => {
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState(0)
  const [input, setInput] = useState("")

  const {user} = useAuth() as any;

  const clickAction = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        `${API_URL}/api/users/change-password`,
        {
          password: input
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user}`,
          },
        }
      );
      if (res.status === 200) {
        close()
        return true
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  const verifyPass = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${API_URL}/api/users/verify/${input}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user}`,
          },
        }
      );
      if (res.status === 200) {
        setInput("")
        setStage(1)
        return true
      }
    }
    catch (error) {
      console.log(error)
      return false
    }
    finally {
      setLoading(false)
    }
  }
  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#00000080", position: 'absolute', zIndex: 999999}} className='h-screen w-screen'>
      <TouchableOpacity onPress={() => close()}  className='absolute right-8 top-10'>
      <AntDesign name="closecircleo" size={24} color="white" />
      </TouchableOpacity>
      <View className='w-3/4 h-auto bg-white rounded-2xl px-4 py-4 mb-28'>
        <Text className='font-grotesk-semibold text-xl'>Change <Text className='text-pup-200 text-2xl'>Password</Text></Text>

        {/* <Text className='font-grotesk-light text-base mt-1 text-gray-400 mb-2'>Enter your current password</Text> */}



    <TextInput
    value={input}
    onChangeText={setInput}
    placeholder={stage === 0 ? `Enter Your Current Password` : `Your New Password`}
    className='w-full py-4 my-2 rounded-lg px-2 bg-gray-100 placeholder:text-sm placeholder:text-gray-400'
    />
    
    <TouchableOpacity onPress={stage === 0 ? () => verifyPass() : () => clickAction()} disabled={loading} className={`bg-pup-200/20 text-white px-2 py-2.5 mt-2 ${loading ? 'w-24' : 'w-20'} rounded-xl`}>
        <Text className='text-pup-200 font-dm-medium text-center'>{loading ? "..." : stage===0 ? "Next" : "Update"}</Text>
    </TouchableOpacity>
      </View>
    </View>
  )
}















export default EmployeeProfile