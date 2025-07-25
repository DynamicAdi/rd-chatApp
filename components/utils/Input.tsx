import { TextInput } from 'react-native'

const Input = ({placeholder, value, setValue, warn=false, className, maxValue}: {
    placeholder: string,
    value: string,
    warn?: boolean,
    className?: string,
    setValue: (text: string | number) => void
    maxValue?: number
}) => {
  return (
    <TextInput
    maxLength={maxValue}
    value={value}
    onChangeText={setValue}
    className={`w-full ${warn ? "bg-red-900/20" : "bg-pup-dark "} py-6 px-4 rounded-xl ${warn ? "text-[#7f1d1d]" : "text-white"} ${className}`} placeholder={placeholder} placeholderTextColor={`${warn ? "#7f1d1d" : "#A78BFA"}`} />
  )
}

export default Input