import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
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
  workingAs: string | null;
  dob: string | null;
  employeeId: string | null;
  image: string | null;
  phone: string | null;
}

const EmployeeProfile = ({
  data,
  handleSubmit,
  setInput,
  input,
  updating,
}: {
  data: any;
  handleSubmit: (title: string) => void;
  setInput: any;
  input: string;
  updating: boolean;
}) => {
  // console.log(data);
  
  const [isPopUp, setPopUp] = useState(false);
  const [title, setTitle] = useState('');
  const [pass, setPass] = useState(false);

  const handleClick = (val: string) => {
    const value = val.toLowerCase();
    const userData = data[value] ? data[value] : '';
    setTitle(val);
    setInput(userData);
    setPopUp(true);
  };
  const fist_letter = data.name[0];
  const last_letter = data.name.split(' ')[1][0];
  const final_name = fist_letter + last_letter;
  // const final_name = "A" + "B"
  const close = () => setPopUp(!isPopUp);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className="relative">
      {isPopUp && (
        <PopUp
          input={input}
          title={title}
          clickAction={() => handleSubmit(title)}
          setInput={setInput}
          close={close}
          loading={updating}
        />
      )}
      {pass && <ChangePass close={() => setPass(!pass)} />}
      <View className="absolute inset-0 -left-32 top-6 z-50 flex h-16 w-full rotate-45 items-center justify-center rounded-br-full bg-pup-dark">
        <Text className="text-center font-grotesk-medium text-xl text-pup-100">
          The RD group of industries
        </Text>
      </View>
      <View className="absolute inset-0 left-32 top-6 -z-50 flex h-16 w-full -rotate-45 items-center justify-center rounded-br-full bg-pup-dark">
        <Text className="text-center font-grotesk-medium text-xl text-pup-100">
          The RD group of industries
        </Text>
      </View>

      <View className="mt-[4.5rem] flex h-full w-[90%] items-end justify-center">
        {/* I CARD */}
        <View className="relative flex h-[70%] w-full items-center justify-end overflow-hidden rounded-3xl bg-white">
          {/* UPPER PART */}
          <View className="absolute -top-14 flex h-1/2 w-full items-center justify-end rounded-full rounded-t-none bg-pup-100">
            <View className="relative mb-2 flex h-36 w-36 items-center justify-center rounded-full border-2 border-white/40  bg-white">
              <TouchableOpacity className="absolute bottom-2 right-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
              </TouchableOpacity>
              {data.image ? (
                <Image
                  source={{ uri: data?.image ? data.image : `https://picsum.photos/1080/2000` }}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <Text className="font-grotesk-medium text-6xl text-black">{final_name}</Text>
              )}
            </View>
          </View>
          {/* CENTER GAP FOR RIBBON */}
          <View className="absolute top-3 flex h-6 w-full items-center justify-center">
            <View className="h-full w-1/3 rounded-full bg-primary-bg"></View>
          </View>

          {/* LOWER PART */}
          <View className="h-[22rem] w-full">
            <Text className="text-center font-grotesk-semibold text-4xl tracking-tighter">
              {data.name}
            </Text>
            <Text className="text-center font-dm-regular text-xl tracking-tighter text-neutral-400">
              {data?.workingAs} • {data?.department}
            </Text>

            <View className="mt-2 px-4">
              <Text className="mb-2 font-dm-semibold text-lg text-gray-600">
                Bio -{' '}
                <Text className="font-dm-light text-sm leading-none tracking-tighter">
                  {data?.bio}
                </Text>
                {'  '}
                <TouchableOpacity onPress={() => handleClick('Bio')}>
                  <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
                </TouchableOpacity>
              </Text>
              <Text className="my-1 font-dm-semibold text-lg text-gray-600">
                Employee Id -{' '}
                <Text className="font-dm-regular text-base leading-none tracking-tighter">
                  {data?.employeeId}
                </Text>
              </Text>
              <Text className="my-1 font-dm-semibold text-lg text-gray-600">
                DOB -{' '}
                <Text className="font-dm-regular text-base leading-none tracking-tighter">
                  {data?.dob}
                </Text>
                                <TouchableOpacity onPress={() => handleClick('Dob')}>
                  <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
                </TouchableOpacity>
              </Text>
              <Text className="my-1 font-dm-semibold text-lg text-gray-600">
                Phone -{' '}
                <Text className="font-dm-regular text-base leading-none tracking-tighter">
                  {data?.phone}
                </Text>
                {'  '}
                <TouchableOpacity onPress={() => handleClick('Phone')}>
                  <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
                </TouchableOpacity>
              </Text>
              <Text className="my-1 font-dm-semibold text-lg text-gray-600">
                Email -{' '}
                <Text className="font-dm-regular text-base leading-none tracking-tighter">
                  {data?.email}
                </Text>
                {'  '}
                <TouchableOpacity onPress={() => handleClick('Email')}>
                  <SimpleLineIcons name="pencil" size={12} color="#8671FF" />
                </TouchableOpacity>
              </Text>
              <View className="flex flex-row">
                <TouchableOpacity onPress={() => setPass(!pass)}>
                  <Text className="my-4 font-dm-semibold text-sm text-pup-100">
                    Change Password
                  </Text>
                </TouchableOpacity>
                <Text className="my-4 font-dm-semibold text-sm text-black"> | </Text>
                <TouchableOpacity>
                  <Text className="my-4 font-dm-semibold text-sm text-red-400">Logout</Text>
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
  );
};

const ChangePass = ({ close }: { close: any }) => {
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [input, setInput] = useState('');

  const { user } = useAuth() as any;

  const clickAction = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/api/users/change-password`,
        {
          password: input,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user}`,
          },
        }
      );
      if (res.status === 200) {
        close();
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const verifyPass = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/users/verify/${input}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user}`,
        },
      });
      if (res.status === 200) {
        setInput('');
        setStage(1);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
        position: 'absolute',
        zIndex: 999999,
      }}
      className="h-screen w-screen">
      <TouchableOpacity onPress={() => close()} className="absolute right-8 top-10">
        <AntDesign name="closecircleo" size={24} color="white" />
      </TouchableOpacity>
      <View className="mb-28 h-auto w-3/4 rounded-2xl bg-white px-4 py-4">
        <Text className="font-grotesk-semibold text-xl">
          Change <Text className="text-2xl text-pup-200">Password</Text>
        </Text>

        {/* <Text className='font-grotesk-light text-base mt-1 text-gray-400 mb-2'>Enter your current password</Text> */}

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={stage === 0 ? `Enter Your Current Password` : `Your New Password`}
          className="my-2 w-full rounded-lg bg-gray-100 px-2 py-4 placeholder:text-sm placeholder:text-gray-400"
        />

        <TouchableOpacity
          onPress={stage === 0 ? () => verifyPass() : () => clickAction()}
          disabled={loading}
          className={`mt-2 bg-pup-200/20 px-2 py-2.5 text-white ${loading ? 'w-24' : 'w-20'} rounded-xl`}>
          <Text className="text-center font-dm-medium text-pup-200">
            {loading ? '...' : stage === 0 ? 'Next' : 'Update'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmployeeProfile;
