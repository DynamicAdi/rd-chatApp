import { Text, TouchableOpacity } from 'react-native'
import PupGrad from './PupGrad'


const PupBtn = ({title, Icon, IconName, IconSize=24, onPress, className }: {
    title?: string,
    Icon?: any,
    IconName?: string,
    IconSize?: number,
    onPress?: any,
    className?: string
    
}) => {
  return (
        <PupGrad className={className}>
          <TouchableOpacity onPress={onPress} className="flex w-full flex-row items-center justify-center py-4">
            {
                title &&
                <Text className="w-fit pr-1 font-grotesk-medium text-2xl text-white">{title}</Text>
            }
            {
                Icon &&
                <Icon name={IconName} size={IconSize} color="white" />
            }
          </TouchableOpacity>
        </PupGrad>
  )
}

export default PupBtn