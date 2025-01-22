import { useIsFocused } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';

type Props = { hidden?: boolean; style?: 'light' | 'dark' };
export const FocusAwareStatusBar = ({ hidden = false, style }: Props) => {
  const isFocused = useIsFocused();
  const { colorScheme } = useColorScheme();

  const finalStyle = style || colorScheme;

  if (Platform.OS === 'web') return null;
  console.log(`Active theme: ${colorScheme}`);

  return isFocused ? <SystemBars style={finalStyle} hidden={hidden} /> : null;
};
