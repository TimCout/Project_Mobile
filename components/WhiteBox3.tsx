import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

export default function WhiteBox3({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
          width: '100%',
          maxWidth: 400,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 16,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: '#f4f4f4',
//     },
//     title: {
//       fontSize: 32,
//       color: '#0ea5e9',
//       fontWeight: '300',
//       textTransform: 'uppercase',
//       marginBottom: 32,
//       textAlign: 'center',
//     },
//     field: {
//       marginBottom: 16,
//     },
//     label: {
//       marginBottom: 6,
//       color: '#0369a1',
//       fontWeight: '500',
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: '#ccc',
//       padding: 10,
//       borderRadius: 8,
//     },
//     button: {
//       backgroundColor: '#0ea5e9',
//       padding: 14,
//       borderRadius: 8,
//       alignItems: 'center',
//       marginTop: 12,
//     },
//     buttonText: {
//       color: 'white',
//       fontWeight: 'bold',
//     },
//     footer: {
//       marginTop: 16,
//       color: '#555',
//       fontSize: 14,
//       textAlign: 'center',
//     },
//     link: {
//       color: '#0ea5e9',
//       textDecorationLine: 'underline',
//     },
//   });
  