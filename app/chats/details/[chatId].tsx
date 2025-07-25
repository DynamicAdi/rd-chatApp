import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import axios from 'axios'
import { API_URL } from 'context/env'
import ChatMe from 'components/screen/ChatMe'
import Details from 'components/utils/Details'
import KnowMoreScreen from 'components/screen/DetailsScreen'

const page = () => {
  return (
    <>
    <KnowMoreScreen />
    </>
  )
}

export default page