import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider} from "firebase/auth";
import { auth } from "../../firebase";
import "./SignUp.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 
  


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  

  const handleLogin = async () => {
    try {

      if (!validateEmail(email)) {
        setErrorMessage("Please enter a valid email address");
        return;
      }

      if (!email || !password) {
        setErrorMessage("Please enter both email and password");
        return;
      }

      

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; 
      localStorage.setItem("userID", user.uid);
      navigate("/");
    } catch (error) {
      setErrorMessage("Email or Password Incorrect");
      
    }
  };


  const handleGoogleSignIn = async () => {

  const provider = new GoogleAuthProvider();
 
  try {

 const result = await signInWithPopup(auth, provider);
  
 const credential =
  GoogleAuthProvider.credentialFromResult(result);
 const token = credential.accessToken;
 const user = result.user;
 navigate("/");
 alert("Logged In successfully with Google!");
 } catch (error) {

 console.error('Error signing in with Google:', error);
 }
}


  const handleMetaSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {

      const result = await signInWithPopup(auth, provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      navigate("/");
      alert("Logged In successfully with Meta!");
    } catch (error) {
      console.error("Error logging in with Meta:", error.message);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      const provider = new OAuthProvider('microsoft.com');
      await signInWithPopup(auth, provider);
      alert("Logged In successfully with Microsoft!");
    } catch (error) {
      console.error("Error logging in with Microsoft:", error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="image-container">
        <img src="/assets/Imgs/AccountPage/Account.png" alt="" />
      </div>
      <div className="form-container">
        <h1 style={{ marginBottom: "5px" }}>Welcome back!</h1>
        <p>Enter your credentials to access your account</p>
        <br />

        <h4>Email</h4>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <h4>Password</h4>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="error-message">{errorMessage}</div>
        <br/>
        <div className="terms-checkbox">
          <input type="checkbox" id="agreeTerms" />
          <label htmlFor="agreeTerms">Remember for 30 days</label>
        </div>
        <button className="sign-up-button" onClick={handleLogin}>
          Login
        </button>
        <div className="divider">
          <hr className="line" />
          <span className="or">Or</span>
          <hr className="line" />
        </div>
        <div className="social-buttons"  style={{ 
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              OUserSelect: "none",
              userSelect: "none"
          }}>
          <button className="google-button" onClick={handleGoogleSignIn}>
            <img src="/assets/Imgs/logos/GoogleIcon.png" alt="Google" />
            Login with Google
          </button>
          <button className="meta-button" onClick={handleMetaSignIn}>
            <img src="/assets/Imgs/logos/meta.png" alt="Meta" />
            Login with Meta
          </button>
          <button className="microsoft-button" onClick={handleMicrosoftSignIn}>
            <img src="/assets/Imgs/logos/microsoft.png" alt="Microsoft" />
            Login with Microsoft
          </button>
        </div>

        <p className="haveAnAccount">
          Don't have an account? <a href="/Signup">Sign Up</a>
        </p>
        <a
          href="/ForgotPassword"
          style={{ color: "blue", fontWeight: "bolder" }} className="forgotpass"
        >
          Forgot Password
        </a>
      </div>
    </div>
  );
}

export default Login;
