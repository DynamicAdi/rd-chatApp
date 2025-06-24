import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';


const TabOptions = ({
  title,
  Icon,
  IconName,
  active,
  onPress
}: {
  title: string;
  Icon: any;
  IconName: string;
  active: string;
  onPress: () => void;
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: active === title ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [active]);

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#8671FF'],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View
        className="flex items-center justify-center gap-0.5 px-6 py-1"
        style={{
          backgroundColor,
          borderRadius: 100,
        }}
      >
        <Icon color={'white'} size={18} name={IconName} />
        <Text className="font-dm-regular text-sm text-white">{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
// const TabOptions = ({
//   Icon,
//   title,
//   IconName,
//   active,
//   onPress,
// }: {
//   Icon: any;
//   title: string;
//   IconName: string;
//   active: string;
//   onPress: () => void;
// }) => {
//   return (
//     <TouchableOpacity
//       onPress={() => onPress()}
//       className={`flex items-center justify-center gap-0.5 px-6 py-1 ${active === title ? 'bg-pup-100' : ''}`}
//       style={{ borderRadius: 100 }}>
//       <Icon color={'white'} size={18} name={`${IconName}`} />
//       <Text className="font-dm-regular text-sm text-white">{title}</Text>
//     </TouchableOpacity>
//   );
// };

const Navbar = () => {
  const options = [
    {
      title: 'Chats',
      Icon: Ionicons,
      IconName: 'chatbubbles-outline',
      route: 'main/page',
    },
    {
      title: 'Announcements',
      Icon: Ionicons,
      IconName: 'chatbubbles-outline',
      route: 'announcements/page',
    },
    {
      title: 'Profile',
      Icon: Ionicons,
      IconName: 'chatbubbles-outline',
      route: 'profile/page',
    },
  ];

  const router = useRouter();

  const [active, setActive] = useState<string>(options[0].title);

  const handleClick = (context: { title: string; route: string }) => {
    switch (context.title) {
      case 'Chats':
        setActive(context.title);
        router.push(context.route);
        break;
      case 'Announcements':
        setActive(context.title);
        router.push(context.route);
        break;

      case 'Profile':
        setActive(context.title);
        router.push(context.route);
        break;

      default:
        break;
    }
  };

  return (
    <View className="absolute bottom-8 flex w-full items-center justify-center">
      <View className="flex w-[90%] flex-row items-start justify-start gap-8 rounded-full bg-pup-dark/90 px-0 py-3">
        <FlatList
          data={options}
          scrollEnabled={false}
          horizontal
          keyExtractor={(item) => item.title}
          contentContainerStyle={{
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            width: '100%',
          }}
          renderItem={(items) => (
            <TabOptions
              onPress={() => handleClick(items.item)}
              active={active}
              Icon={items.item.Icon}
              IconName={items.item.IconName}
              title={items.item.title}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Navbar;
