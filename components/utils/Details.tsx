import GroupReply from 'components/elements/GroupReply'
import ProfileAvatar from 'components/elements/ProfileAvatar'
import GrpList from 'components/utils/GrpListBubble'
import React, {ReactNode} from 'react'
import { View, Text, ScrollView } from 'react-native'


const Details = ({image, children, name, type, subtype, role}: {
    name: string,
    type: string,
    subtype?: string
    image?: string,
    children: ReactNode
    role?:string
}) => {
    return (
        <View style={{ flex: 1 }}>
            <View className='w-full h-full flex justify-start py-8 items-center px-6 gap-4'>
            <ProfileAvatar
            image={image}
            name={name}
            type={type}
            subType={subtype}
            role={role}
            />
        <ScrollView className='w-full'>
            {children}
        </ScrollView>            
            </View>
        </View>
    )
}

export default Details