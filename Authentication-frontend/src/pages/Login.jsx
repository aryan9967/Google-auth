import axios from "axios";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: `${import.meta.env.VITE_CLIENT_ID}`,
        callback: handleResponse,
        login_uri: `http://localhost:3000/api/v1/auth/signin `,
      });

      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        logo_alignment: "left",
      });
    }
  }, []);

  async function handleResponse(response) {
    // console.log("encoded JWT token", response.credential);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        { credentials: response.credential }
      );
      console.log(data);
      if (data.verification_status) {
        window.alert("User verified successfully");
      } else {
        window.alert("Verification error");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div id="buttonDiv"></div>
    </>
  );
}
