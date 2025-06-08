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
  