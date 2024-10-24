"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/lib/slices/auth/authApiSlice";
import { setCredentials } from "@/lib/slices/auth/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RootState } from "@/lib/store";
import * as Yup from "yup";
import { useSelector } from "react-redux";

// defining the login schema for input validations
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // checking if user info already exists then redirect user to dashboard page
    if (userInfo) {
      router.push("/admin/dashboard");
    }
  }, [userInfo, router]);

  // function for handling the login
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      // attempting to login with credentials
      const response = await login(values).unwrap();

      // checking if response status is not true
      if (!response.success) {
        // throwing error with error message
        throw new Error(response.message || "Login failed");
      }

      // if response is true then setting the authentication state
      dispatch(setCredentials({ ...response.data }));

      // redirecting the user to dashboard page
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-[65px]">
      <div className="w-[410px] h-[376px] p-6 bg-white rounded-[10px] border border-[#e1e1e1] flex-col justify-start items-center gap-6 inline-flex">
        <div className="w-[362px] h-[84px] flex-col justify-center items-start gap-3 flex">
          <div className="text-black text-[26px] font-bold font-montserrat leading-tight">
            Admin Login
          </div>
          <div className="self-stretch text-neutral-500 text-sm font-normal font-raleway leading-tight">
            Login provides secure access to personalized accounts by verifying
            user credentials
          </div>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="self-stretch flex-col justify-center items-center gap-5 flex w-full">
              <div className="self-stretch h-16 flex-col justify-center items-center gap-1 flex">
                <div className="self-stretch text-black text-sm font-medium font-raleway">
                  Login
                </div>
                <Field
                  type="email"
                  name="email"
                  className="self-stretch px-4 py-3 rounded-md border border-[#e1e1e1] justify-start items-center gap-3 inline-flex text-black text-base font-medium font-raleway leading-tight"
                  placeholder="xyz@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-600 text-xs text-left w-full"
                />
              </div>
              <div className="self-stretch h-16 flex-col justify-center items-center gap-1 flex">
                <div className="self-stretch text-black text-sm font-medium font-raleway">
                  Password
                </div>
                <Field
                  type="password"
                  name="password"
                  className="self-stretch px-4 py-3 rounded-md border border-[#e1e1e1] justify-start items-center gap-3 inline-flex text-black text-base font-medium font-raleway leading-tight"
                  placeholder="**********"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-xs text-left w-full"
                />
              </div>
              <div className="self-stretch h-11 flex-col justify-start items-start gap-3 flex">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="self-stretch h-11 px-[3px] py-3 bg-[#2e6fac] rounded-[45px] flex-col justify-center items-center gap-2.5 flex"
                >
                  <div className="text-right text-white text-base font-semibold font-montserrat leading-tight">
                    {isLoading ? "Submitting" : "Login"}
                  </div>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
