import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import axios from 'axios'
import { API_URL } from 'context/env'
import ChatMe from 'components/screen/ChatMe'

const page = () => {
    const params = useGlobalSearchParams()
    const id = params.chatId

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    
    const getAll = async () => {
      const getChatData  = await axios.get(`${API_URL}/api/manage/get-by-id/${id}`)
      if (getChatData.status === 200) {
        setData(getChatData.data)
        setLoading(false)
      }
    }

    useEffect(() => {
      getAll()
    }, [])
  return (
    <ChatMe 
    loading={loading}
    data={data}
    />
  )
}

export default page