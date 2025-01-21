import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Platform, Pressable, Text, View } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import * as z from 'zod';

import { ControlledInput } from '@/components/ui';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { Link } from 'expo-router';

const schema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(1, 'Min. 1 character')
    .max(16, 'Maximum 16 characters'),
  lastName: z.string({ required_error: 'LastName is required' }).min(1).max(8),
  email: z.string().min(1, 'Email is required').email(),
  phone: z.number().min(10).max(10),
});

type TSignup = z.infer<typeof schema>;

export default function Signup() {
  const { control, handleSubmit } = useForm<TSignup>({
    defaultValues: {
      firstName: 'John ',
      lastName: '',
      email: '',
      phone: 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: TSignup) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <ScrollView className="flex-1 px-4 pt-8">
        <View>
          <Text className="text-2xl font-bold text-black">
            Welcome <Text className="text-blue-600">Onboard!</Text>
          </Text>
          <Text className="mt-1 text-sm text-gray-500">
            Enter your details below to continue
          </Text>
        </View>

        {/* First Name */}
        <View className="mt-6">
          <ControlledInput
            name="firstName"
            control={control}
            placeholder="Enter your first name"
            label="Enter your first name"
          />
        </View>

        {/* Last Name */}
        <View className="mt-4">
          <ControlledInput
            name="lastName"
            control={control}
            placeholder="Enter your last name"
            label="Enter your last name"
          />
        </View>

        {/* Email */}
        <View className="mt-4">
          <ControlledInput
            name="email"
            control={control}
            placeholder="Enter your mail id"
            label="Enter your mail id"
          />
          <Text className="mt-1 text-xs text-gray-400">
            we will send you the 4 digit verification code
          </Text>
        </View>

        {/* Phone Number */}
        <View className="mt-4">
          <ControlledInput
            name="phone"
            control={control}
            placeholder="9876543210"
            label="Enter your phone number"
          />
        </View>

        {/* Submit Button */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="mt-6 rounded-lg bg-blue-600 py-3"
        >
          <Text className="text-center font-medium text-white">Send OTP</Text>
        </Pressable>

        {/* Footer */}
        <View className="mt-6">
          <Text className="text-center text-sm text-gray-500">
            If you already have an account?
            <Link
              className="font-medium text-blue-600"
              href={{ pathname: '/login' }}
            >
              login
            </Link>
          </Text>
          <Text className="mt-2 text-center text-xs text-gray-400">
            You agree to the
            <Text className="text-blue-600 underline">terms & Conditions</Text>&
            <Text className="text-blue-600 underline">privacy policy</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
