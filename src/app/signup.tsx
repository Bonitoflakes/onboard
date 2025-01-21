import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { ControlledInput, FocusAwareStatusBar } from '@/components/ui';

const schema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(1, 'Min. 1 character')
    .max(16, 'Maximum 16 characters'),
  lastName: z.string({ required_error: 'LastName is required' }).min(1).max(8),
  email: z.string().min(1, 'Email is required').email(),
  phone: z
    .string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits')
    .transform((val) => Number(val)),
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
    <>
      <FocusAwareStatusBar />
      <KeyboardAwareScrollView style={{ flex: 1 }} bottomOffset={62}>
        <View className="m-4">
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
              keyboardType="email-address"
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
              keyboardType="numeric"
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
                // href="/"
              >
                login
              </Link>
            </Text>
            <Text className="mt-2 text-center text-xs text-gray-400">
              You agree to the
              <Text className="text-blue-600 underline">
                terms & Conditions
              </Text>
              &<Text className="text-blue-600 underline">privacy policy</Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
