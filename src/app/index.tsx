import * as React from 'react';
import { Redirect } from 'expo-router';

type Props = {};

const Index = ({}: Props) => {
  return <Redirect href="/signup" />;
};

export default Index;
