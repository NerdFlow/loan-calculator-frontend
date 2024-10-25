"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/app/assets/logos/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutSessionMutation } from "@/lib/slices/auth/authApiSlice";
import { RootState } from "@/lib/store";
import { toast } from "react-toastify";
import { logout } from "@/lib/slices/auth/authSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  // initializing the the dispatch hook
  const dispatch = useDispatch();
  const router = useRouter();

  // getting the user info from the authentication state
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // getting the logout function
  const [logoutSession] = useLogoutSessionMutation();

  // function for logging out the user
  const handleLogout = async () => {
    try {
      const response = await logoutSession({}).unwrap();

      if (!response.success) {
        // showing error message if there is any error
        toast.error(response.message);
      } else {
        console.log(response);
        dispatch(logout());

        // redirecting user to login page
        router.push("/admin/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Ensures the component is mounted before rendering client-specific logic
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex bg-primary w-full h-[44px] px-[24px] justify-between items-center flex-shrink-0">
      <Image src={Logo} width={143} height={29} alt="logo" />

      {isClient && userInfo && (
        <button
          onClick={handleLogout}
          className="text-white bg-white-600 font-montserrat font-semibold text=[12px] px-4 py-2 rounded-m"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
