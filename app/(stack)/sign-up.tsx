import * as React from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import HeaderComp from "@/components/signIn/HeaderComp";
import CredInputComp from "@/components/signIn/CredInputComp";
import Button from "@/components/signIn/Button";
import { StatusBar } from "expo-status-bar";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    if (!code) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    setIsLoading(true);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: fix issue with rendering verification component
  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 5}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 px-6">
              <HeaderComp
                type="verify"
                title="Check Your Email"
                subtitle={`We've sent a verification code to\n${emailAddress}`}
              />

              {/* verification form */}
              <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Enter Verification Code
                </Text>

                <CredInputComp
                  type="verify"
                  value={code}
                  setValue={setCode}
                  loading={isLoading}
                />

                <Button
                  type="verify"
                  onPress={onVerifyPress}
                  loading={isLoading}
                  loadingText="Verifying..."
                  text="Verify Email"
                />

                <TouchableOpacity className="py-2">
                  <Text className="text-blue-600 font-medium text-center">
                    Didn't receive the code? Resend
                  </Text>
                </TouchableOpacity>
              </View>

              {/* footer */}
              <View className="pb-6">
                <Text className="text-center text-gray-500 text-sm">
                  Almost there! Just one more step
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 5}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-6">
            <View className="flex-1 justify-center">
              <HeaderComp
                title="Join MyFitnessApp"
                subtitle={"Start your fitness journey\nand achieve your goals"}
              />

              {/* sign-up form */}
              <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Create Your Account
                </Text>

                <CredInputComp
                  type="email"
                  value={emailAddress}
                  setValue={setEmailAddress}
                  loading={isLoading}
                />

                <CredInputComp
                  type="password"
                  value={password}
                  setValue={setPassword}
                  loading={isLoading}
                  createPassword={true}
                />

                <Button
                  type="signup"
                  onPress={onSignUpPress}
                  loading={isLoading}
                  loadingText="Creating Account..."
                  text="Create Account"
                />

                <Text className="text-xs text-gray-500 text-center mb-4">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy
                </Text>
              </View>

              <View className="flex-row justify-center items-center">
                <Text className="text-gray-600">Already have an account? </Text>
                <Link href="/sign-in" asChild>
                  <TouchableOpacity>
                    <Text className="text-blue-600 font-semibold">Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>

            {/* footer */}
            <View className="pb-6">
              <Text className="text-center text-gray-500 text-sm">
                Ready to transform your fitness?
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
