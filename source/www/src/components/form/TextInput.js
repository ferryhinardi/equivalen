// @flow

import React from 'react';
import type { ElementProps } from 'react';
import { View, Text, TextInput } from 'react-native';

const TextInputWrapper = ({ onChange, value, error, ...rest }: ElementProps<typeof TextInput>) => {
  const containerStyle = {
    width: '100%',
    ...(rest.isPasswordType ? { display: 'centents' } : {}),
  };

  return (
    <View style={containerStyle}>
      <TextInput onChangeText={text => onChange(text)} value={value} {...rest} />
      {!!error && <Text>{error}</Text>}
    </View>
  );
}

export default TextInputWrapper;
