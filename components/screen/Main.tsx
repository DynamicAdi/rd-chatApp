import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ChatBubble from 'components/elements/ChatBubble';
import GradBox from 'components/elements/GradBox';
import Selector from 'components/elements/Selector';
import CreateChat from 'components/utils/CreateChat';
import Input from 'components/utils/Input';
import { useAuth } from 'context/AuthContext';
import { API_URL } from 'context/env';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function Main() {
    const [active, setActive] = useState(false)
    const [New, setNew] = useState(false)
    const [UserInput, setInput] = useState("")
    const [desc, setDsc] = useState("")
    const [Grp, setGrp]: any = useState([])
    const [loading, setLoading] = useState(true)

    const handleCreateGroup = async () => {
      const title = UserInput.trim()
      const description = desc.trim()

      const req = await axios.post(`${API_URL}/api/manage/create-grp`, {
        data: {
          name: title,
          description: description
        }
      })

      if (req.status === 200) {
        console.log("Done")
        alert("Created successfully, Please Refresh by changing tabs")
      }
    }
    const getGrp = async () => {
      setLoading(true)
      const req = await axios.get(`${API_URL}/api/manage/get-all`)
      if (req.status === 200) {
        setGrp(req.data)
        setLoading(false)
      }
    }
      const router = useRouter()
    
//       const logout = async () => {
//     // setIsLoading(true);
//     await AsyncStorage.removeItem("userToken");
//     // setUser(null);
//     // setIsLoading(false);
//     router.replace("/(auth)/welcome");
// };

    useEffect(() => {
      getGrp()
      // console.log("working")
    }, [])
    if (loading) {
      return (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color={"white"} />
              <Text className='text-white text-2xl font-dm-medium'>Getting Your Chats</Text>
            </View>
      )
    }
    
  return (

    <View style={{ flex: 1 , position: 'relative'}} >
      
      {
        New && <CreateChat 
        Action={() => handleCreateGroup()}
        Dec={desc}
        setDesc={setDsc}
        UserInput={UserInput}
        setInput={setInput}
        close={() => setNew(false)}
        />
      }
      <Selector setNew={setNew} active={active} setActive={setActive} />
      
      <ScrollView style={{minHeight: 100}}>
        <GradBox />
        <View className="px-4">
          <Text className="py-2 font-pop-semibold text-3xl tracking-[-1px] text-white">
            All Chats
          </Text>
              {/* <TouchableOpacity onPress={logout}><Text style={{color: "white"}}>Logout</Text></TouchableOpacity> */}

          {
            Grp.length > 0 ? (
        <FlatList
          data={Grp}
          scrollEnabled={false}
          horizontal
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            width: '100%',
          }}
          renderItem={(items) => (
            <ChatBubble 
            key={items.index}
            id={items.item.id}
            name={items.item.name}
            image={items.item.image}
            message={items.item.message}
            />
          )}
        />
            ) : (
              <Text className='text-white font-dm-semibold text-center'>No Chats Found</Text>
              // <TouchableOpacity onPress={logout}><Text>Logout</Text></TouchableOpacity>
            )
          }
          {/*
          <ChatBubble /> */}
        </View>
      
      {/* <Navbar /> */}
      </ScrollView>
    </View>
  );
}
