import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { clothesState, useLaundry } from '../store/store';
import { colors } from '../config/constant';

const DressItemList: clothesState[] = [
  {
    title: 'Dress',
    image: 'https://cdn-icons-png.flaticon.com/512/9883/9883565.png',
    alt: 'dress flaticon ',
    id: 1,
    price: 1,
    count: 0
  },
  {
    title: 'Jacket',
    image: 'https://cdn-icons-png.flaticon.com/512/10127/10127426.png',
    alt: 'jacket flaticon ',
    id: 2,
    price: 15,
    count: 0
  },
  {
    title: 'T-shirt',
    image: 'https://cdn-icons-png.flaticon.com/512/9986/9986000.png',
    alt: 'tshirt flaticon ',
    id: 3,
    price: 1,
    count: 0
  },
  {
    title: 'Socks',
    image: 'https://cdn-icons-png.flaticon.com/512/9584/9584216.png',
    alt: 'socks flaticon ',
    id: 4,
    price: 0.5,
    count: 0
  },
  {
    title: 'Shirt',
    image: 'https://cdn-icons-png.flaticon.com/512/2957/2957379.png',
    alt: 'shirt flaticon ',
    id: 5,
    price: 1,
    count: 0
  },
  {
    title: 'Trousers',
    image: 'https://cdn-icons-png.flaticon.com/512/599/599580.png',
    alt: 'trousers flaticon ',
    id: 6,
    price: 1,
    count: 0
  }
];

const DressItemComponent = () => {
  const addToCart = useLaundry((state) => state.addToCart);
  const cart = useLaundry((state) => state.cart);
  const removeFromCart = useLaundry((state) => state.removeFromCart);
  const numberOfItemInCart = (id: number) => {
    return cart.filter((cartItem) => cartItem?.id === id)[0]?.count;
  };

  return (
    <View>
      {DressItemList.map((item) => (
        <Pressable
          key={`DessItem-${item.title}-${item.id}`}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              margin: 10,
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          ]}
        >
          <Image
            source={{ uri: item.image }}
            alt={item.alt}
            style={{ width: 70, height: 70 }}
          />

          <View>
            <Text style={{ color: colors.action }}>{item.title}</Text>
            <Text style={{ color: colors.action }}>{item.price} €</Text>
          </View>

          {cart.some((c) => c.id === item.id) ? (
            <View
              style={{ flexDirection: 'row', width: 100, alignItems: 'center' }}
            >
              <Pressable
                onPress={() => removeFromCart(item)}
                style={{
                  width: 26,
                  height: 26,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: colors.action,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 50,
                  backgroundColor: colors.cards
                }}
              >
                <MaterialIcons name="remove" size={16} color="#246E89" />
              </Pressable>
              <Text
                style={{
                  color: colors.action,
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginHorizontal: 10
                }}
              >
                {numberOfItemInCart(item.id)}
              </Text>
              <Pressable
                onPress={() => addToCart(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: colors.action,
                  borderStyle: 'solid',
                  width: 26,
                  height: 26,
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 50,
                  backgroundColor: colors.cards
                }}
              >
                <MaterialIcons name="add" size={16} color="#246E89" />
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => addToCart(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.action,
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                width: 100
              }}
            >
              <Text
                style={{
                  color: colors.action,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                Add
              </Text>
            </Pressable>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default DressItemComponent;

const styles = StyleSheet.create({});
