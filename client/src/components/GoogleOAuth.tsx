import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { app } from "@/firebase";
import { loginFailure, loginSuccess } from "@/redux/user/userSlice";
import googleIcon from "@/assets/google.png";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth(app);

  const handleGoogleOAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const popupSignIn = await signInWithPopup(auth, provider);
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            username: popupSignIn.user.displayName,
            email: popupSignIn.user.email,
            googlePhotoURL: popupSignIn.user.photoURL,
          }),
        }
      );

      if (res.status === 200) {
        dispatch(loginSuccess(res.data));
        navigate("/");
      }
    } catch (error: any) {
      console.error(error);
      dispatch(loginFailure("Something went wrong"));
    }
  };

  return (
    <button
      type="button"
      className="flex items-center w-full mx-auto btn gap-x-2"
      onClick={() => handleGoogleOAuth()}
    >
      <img src={googleIcon} alt="" className="object-cover w-5 h-5" />
      Continue with Google
    </button>
  );
};

export default GoogleOAuth;
