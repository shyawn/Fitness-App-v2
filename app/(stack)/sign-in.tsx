import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleSignIn from "@/components/signIn/GoogleSignIn";
import HeaderComp from "@/components/signIn/HeaderComp";
import CredInputComp from "@/components/signIn/CredInputComp";
import Button from "@/components/signIn/Button";
import { StatusBar } from "expo-status-bar";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 5}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-6">
            {/* header */}
            <View className="flex-1 justify-center">
              <HeaderComp
                title="MyFitnessApp"
                subtitle={"Track your fitness journey\nand reach your goals"}
              />

              {/* sign-in form */}
              <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Welcome back
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
                />
              </View>

              <Button
                type="signin"
                onPress={onSignInPress}
                loading={isLoading}
                loadingText="Signing In..."
                text="Sign In"
              />

              {/* divider */}
              <View className="flex-row items-center my-4">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="px-4 text-gray-500 text-sm">or</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              <GoogleSignIn />

              {/* sign-up link */}
              <View className="flex-row justify-center items-center mt-4">
                <Text className="text-gray-600">Don't have an account? </Text>
                <Link href="/sign-up" asChild>
                  <TouchableOpacity>
                    <Text className="text-blue-600 font-semibold">Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>

            {/* footer */}
            <View className="pb-6">
              <Text className="text-center text-gray-500 text-sm">
                Start your fitness journey today
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
