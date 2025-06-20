import { TextInput } from 'react-native'

const Input = ({placeholder}: {
    placeholder: string,

}) => {
  return (
    <TextInput className='w-full bg-pup-dark py-6 px-4 rounded-xl text-white' placeholder={placeholder} placeholderTextColor="#A78BFA" />
  )
}

export default Input