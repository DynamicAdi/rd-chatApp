import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from 'context/AuthContext';

const ProfileAvatar = ({
  image,
  name,
  type,
  subType,
  role,
}: {
  image?: string;
  name: string;
  type: string;
  subType?: string;
  role?: string;
}) => {

  const fist_letter = name;
  const last_letter = name?.split(' ')[1][0];
  const final_name = fist_letter + last_letter;
    // const final_name = "A" + "B"
  const router = useRouter();

  return (
    <>
      {/*  */}
      <View style={{ alignItems: 'center' }}>
        <View className="flex h-40 w-full items-center justify-center">
          <View className="flex h-48 w-48 items-center justify-center rounded-full border border-solid border-white/20">
            <View className="flex h-40 w-40 items-center justify-center rounded-full border border-solid border-white/40">
              <View className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-solid border-white/60">
                <View
                  className={`${image ? '' : 'bg-pup-100/20'} relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-solid border-white/80`}>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Text className="text-3xl text-pup-100">{final_name}</Text>
                  )}
                  {role === 'Admin' && (
                    <TouchableOpacity className="absolute top-2 z-[99]">
                      <AntDesign name="edit" color={'white'} size={14} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text
            className="relative my-4 mb-1 text-center font-grotesk-semibold text-3xl text-white"
            numberOfLines={1}>
            {name}
            {
              role === "Admin" && (
                <TouchableOpacity className="absolute pl-2">
              <AntDesign name="edit" color={'white'} size={14} />
            </TouchableOpacity>
            ) 
          }
          </Text>
          <Text
            className="relative text-center font-dm-regular text-xl text-neutral-500"
            numberOfLines={2}>
            {type} ok {subType ? `• ${subType}` : ''}
            {
              role === "Admin" && (
            <TouchableOpacity className="absolute">
              <AntDesign name="edit" color={'white'} size={14} />
            </TouchableOpacity>
              )
            }
          </Text>
        </View>
      </View>
      <TouchableOpacity className="absolute left-8 top-6" onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color={'white'} />
      </TouchableOpacity>
      <View className="h-0.5 w-5/6 bg-pup-dark"></View>
    </>
  );
};

export default ProfileAvatar;
