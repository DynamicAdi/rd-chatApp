import { FlatList, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from 'components/elements/Avatar';
import { useState } from 'react';

const GradBox = () => {
  const tabs = [
    { title: 'All', isActive: true },
    { title: 'Groups', isActive: false },
    { title: 'Private', isActive: false },
    { title: 'Admins', isActive: false },
  ]

  const [Active, setActive] = useState(tabs[0].title);

  const handleTabPress = (index: number) => {
    setActive(tabs[index].title);
  };
  return (
    <>
      <LinearGradient
        colors={['#681CFF', '#1D006E']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="flex h-28 w-full justify-center"
        style={{ borderBottomRightRadius: 80 }}>
        <View className="flex h-auto w-full flex-row items-center justify-between px-12 pl-2">
        <Avatar uri='https://picsum.photos/1080/1080' />
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#681CFF', '#1D006E']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="relative flex h-16 w-full justify-end">
        <View className="absolute right-0 flex h-full w-full items-end justify-end rounded-bl-none rounded-tl-full bg-primary-bg p-2">
          <LinearGradient
            colors={['#681CFF', '#1D006E']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 120,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 10,
            }}
            className="w-[98%] rounded-full rounded-br-none rounded-tr-none px-8 py-2 flex flex-row gap-2 justify-between">
            <FlatList 
            data={tabs}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Text
                onPress={() => handleTabPress(index)}
                className={` font-dm-medium px-6 rounded-full py-1.5 ${Active === item.title ? 'bg-white text-black' : 'text-white'}`}>
                {item.title}
              </Text>
            )}
            contentContainerStyle={{ gap: 0 }}
            style={{ flexGrow: 0, paddingRight: 0 }}
            />
            {/* <Text className={`text-black bg-white font-dm-medium px-6 rounded-full py-1.5`}>All</Text>
            <Text className={`text-white font-dm-medium px-6 rounded-full py-1.5`}>Groups</Text>
            <Text className={`text-white font-dm-medium px-6 rounded-full py-1.5`}>Private</Text>
            <Text className={`text-white font-dm-medium px-6 rounded-full py-1.5`}>Admins</Text> */}


          </LinearGradient>
        </View>
      </LinearGradient>
    </>
  );
};

export default GradBox;
