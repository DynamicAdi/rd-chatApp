import Details from 'components/utils/Details'
import { View, Text, FlatList } from 'react-native'


function InfoBox({title, data}: {
    title: string,
    data: any[]
}) 
{
    return (
                        <View className='w-full min-h-32 h-auto p-4 py-2 rounded-2xl bg-pup-200 my-2'>
                <Text className='text-white text-2xl font-grotesk-semibold mb-3'>{title} - </Text>
                {data.length > 0 && 
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <View key={index}>
              {Object.entries(item).map(([key, value], idx) => (
                <Text
                    key={idx}
                    className='text-white text-lg py-0.5 font-dm-medium'
                >
                    <Text className='font-dm-bold'>{key}</Text> - {value as any}
                </Text>
              ))}
            </View>
          )}

        />
                }
            </View>
    )
}
const ClientProfile = () => {
    const data = [
        {
            "key": "Okay",
            "budget1": "Okay",
            "price": "Okay",
            "check": "Okay",

        },
    ]
        const data2 = [
        {
            "key": "Okay",
            "budget1": "Okay",
            "price": "Okay",
            "check": "Okay",

        },
    ]
    return (
        <Details>
            <InfoBox title='Personal Information' data={data} />
            <InfoBox title='Project Information' data={data2} />

        </Details>
    )
}

export default ClientProfile