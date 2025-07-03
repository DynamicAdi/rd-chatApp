import { AntDesign } from '@expo/vector-icons'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

const PopUp = ({clickAction, input, setInput, title, close, loading}: {
    title: string,
    setInput: any,
    input: string,
    close: any,
    int?: number
    loading: boolean,
    clickAction: (title: string) => void
}) => {
  return (
<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#00000080", position: 'absolute', zIndex: 999999}} className='h-screen w-screen'>
      <TouchableOpacity onPress={() => close()}  className='absolute right-8 top-10'>
      <AntDesign name="closecircleo" size={24} color="white" />
      </TouchableOpacity>
      <View className='w-3/4 h-auto bg-white rounded-2xl px-4 py-4 mb-28'>
        <Text className='font-grotesk-semibold text-xl mb-2'>Edit <Text className='text-pup-200 text-2xl'>{title}</Text></Text>


    <TextInput 
    keyboardType={title.toLowerCase() === "phone" ? "numeric" : "default"}
    value={input}
    onChangeText={setInput}
    placeholder={`Please enter your ${title}`}
    className='w-full py-4 my-2 rounded-lg px-2 bg-gray-100 placeholder:text-sm placeholder:text-gray-400'
    />
    
    <TouchableOpacity onPress={() => clickAction(title)} disabled={loading} className={`bg-pup-200/20 text-white px-2 py-2.5 mt-2 ${loading ? 'w-24' : 'w-20'} rounded-xl`}>
        <Text className='text-pup-200 font-dm-medium text-center'>{loading ? "Updating..." : "Update"}</Text>
    </TouchableOpacity>
      </View>
    </View>
  )
}

export default PopUp
