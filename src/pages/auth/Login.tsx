// HERE
import { useEffect, useState } from "react";
import classNames from "classnames";

import {
  Box,
  Card,
  Flex,
  Text,
  Heading,
  Button,
  TextField,
} from "@radix-ui/themes";

import { useFormik } from "formik";
import * as Yup from "yup";
import { create } from "zustand";

type State = {
  email: string;
  password: string;
};

type Action = {
  updateEmail: (email: State["email"]) => void;
  updatePassword: (password: State["password"]) => void;
};

const usePersonStore = create<State & Action>((set) => ({
  email: "",
  password: "",
  updateEmail: (email) => set(() => ({ email: email })),
  updatePassword: (password) => set(() => ({ password: password })),
}));

const ChildElement = () => {
  return <> ✦──────➤ </>;
};

// ★ Login ─────────────────────────────────────────────────────➤
// NOTE

//    My register Serializer is receiving 2 passwords, but there is no reason for it since  it doesn't do any validation.

const Login = () => {
  const updateEmail = usePersonStore((state) => state.updateEmail);
  const updatePassword = usePersonStore((state) => state.updatePassword);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(" ✉ :", values); // [LOG] ✉ 
    },
  });

  return (
    //──✦─DOM────➤

    <div className="flex flex-col gap-10 w-full h-full justify-center items-center">
      <ChildElement />

      <Card size="4" className="w-full max-w-lg h-full max-h-96">
        <Heading as="h2" size="8" trim="start" mb="7" color="orange">
          Crescer
        </Heading>

        <Heading as="h3" size="5" trim="start" mb="5">
          Sign in
        </Heading>

        <form onSubmit={formik.handleSubmit}>
          <Box mb="5">
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>

            <TextField.Root
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <Text size="2" color="red">
                {formik.errors.email}
              </Text>
            )}
          </Box>

          <Box mb="5" position="relative">
            <Flex align="baseline" justify="between" mb="1">
              <Text
                as="label"
                size="2"
                weight="bold"
                htmlFor="example-password-field"
              >
                Password
              </Text>
            </Flex>
            <TextField.Root
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.password && formik.errors.password && (
              <Text size="2" color="red">
                {formik.errors.password}
              </Text>
            )}
          </Box>

          <Flex mt="6" justify="end" gap="3">
            <Button variant="outline" type="submit">
              Sign in
            </Button>
          </Flex>
        </form>
      </Card>
    </div>
  );
}; // ★ ───────────────────────────────────────────────────────────────────➤

export default Login;
