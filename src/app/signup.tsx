import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, TextInput as RNTextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { ControlledInput, FocusAwareStatusBar, Text } from '@/components/ui';
import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>({
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
      {/* <FocusAwareStatusBar style="dark" /> */}
      <SafeAreaView className="grow">
        <KeyboardAwareScrollView
          bottomOffset={62}
          contentContainerClassName="grow"
        >
          <LinearGradient
            colors={['#DFE8FF', '#FFFFFF', 'red']}
            className="flex-1 grow"
          >
            <View className="grow m-4">
              <View className="flex-row gap-2">
                <Text className="text-[32px] font-bold text-black">
                  Welcome
                </Text>
                <Text className="text-[32px] font-bold text-primary">
                  Onboard!
                </Text>
              </View>

              <View className="grow justify-between">
                <View className="">
                  {/* First Name */}
                  <View className="mt-4">
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
                    <Text className="text-[#161616] text-base font-medium ">
                      Enter your mail id
                    </Text>
                    <Text className="mt-2 text-xs font-medium text-[#5A5A5A]">
                      we will send you the 4 digit verification code
                    </Text>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <RNTextInput
                          placeholder="Enter your mail id"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          className="mt-2 h-12 rounded-md border-[0.5px] border-neutral-300 bg-white px-4 py-3 font-inter text-base  font-semibold leading-5"
                          keyboardType="email-address"
                        />
                      )}
                      name="email"
                    />
                    <Text className="text-sm text-danger-400 dark:text-danger-600">
                      {errors.email && errors.email.message}
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
                </View>

                {/* Footer */}
                <View className="mt-6">
                  {/* Submit Button */}
                  <Pressable
                    onPress={handleSubmit(onSubmit)}
                    className="mt-6 rounded-md h-[60px] bg-primary flex items-center justify-center "
                  >
                    <Text className="text-center font-semibold text-lg text-white">
                      Send OTP
                    </Text>
                  </Pressable>

                  <Text className="mt-2 text-center text-[#161616] text-sm font-medium">
                    If you already have an account ?
                    <Link
                      className="font-medium text-primary"
                      href={{ pathname: '/login' }}
                    >
                      &nbsp;Login
                    </Link>
                  </Text>

                  <View className="mt-6 flex-row items-center justify-center gap-1">
                    <Text className="text-center text-xs">
                      You agree to the
                    </Text>
                    <Text className="text-primary text-center text-xs ">
                      Terms & Conditions
                    </Text>
                    <Text className="text-black text-center text-xs ">&</Text>
                    <Text className="text-primary text-center text-xs ">
                      Privacy policy
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      <StatusBar backgroundColor="#DFE8FF" />
    </>
  );
}
