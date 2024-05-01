import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passeye, setpasseye] = useState(true);
  const [hintshow, sethintshow] = useState(false);
  const [passwordStrength, setpasswordStrength] = useState("medium");
  const [isFocused, setIsFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
   
    if (!name || !email || !password || !termsAgreed) {
      if(name && email && password && !termsAgreed){
      seterror("Please Agree to Terms & Policy");
      }else
      seterror("Please Fill all fields");
      return;
    }


    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const strength = checkPasswordStrength(password);
    if (strength === "weak") {
      seterror("Password should be at least 8 characters long and contain a number and an uppercase letter.");
      return;
    }

    try {
      const authInstance = getAuth();
      await createUserWithEmailAndPassword(authInstance, email, password);
      seterror("");
      setEmailError("");
      navigate("/");
    } catch (error) {
      alert("Error signing up: " + error.message);
      console.error("Error signing up:", error.message);
    }
  };

  const showhidepass = () => {
    setpasseye(!passeye);
  };

  const handlehint = () => {
    sethintshow(!hintshow);
  };

  const checkPasswordStrength = (password) => {
    if (password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password)) {
      return "strong";
    } else if (password.length >= 6) {
      return "medium";
    } else {
      return "weak";
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = checkPasswordStrength(newPassword);
    setpasswordStrength(strength);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    setEmail(newEmail);
    if(newEmail=="")
    {
      setEmailError("");
    }
    else if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address.");
    }
    else{
      setEmailError("");
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
        <h1>Get Started Now</h1>
        <br />

        <h4>Name</h4>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <h4>Email</h4>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <div className="error" style={{color:"crimson"}}>{emailError}</div>}
        <br />
        <h4>Password</h4>
        <div
          style={{ position: "relative" }}
          className={`passcontainer${isFocused ? " focused" : ""}`}
        >
          <input
            type={passeye ? "password" : "text"}
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={
              passwordStrength === "weak"
                ? "weak"
                : passwordStrength === "medium"
                ? "medium"
                : "strong"
            }
            required
          />
          <img
            onClick={showhidepass}
            className="passeye"
            src={
              passeye
                ? "https://img.icons8.com/ios/50/visible--v1.png"
                : "https://img.icons8.com/material-outlined/24/closed-eye.png"
            }
            alt=""
          />
          {password.length > 0 && (
            <p
              style={{
                textAlign: "start",
                marginBottom: "15px",
                fontSize: "0.9rem",
                color:
                  passwordStrength === "weak"
                    ? "red"
                    : passwordStrength === "medium"
                    ? "gray"
                    : "green",
              }}
            >
              Password is {passwordStrength}
            </p>
          )}
          <h3
            onClick={handlehint}
            style={{ 
              textAlign: "start", 
              fontSize: "1rem", 
              cursor: "pointer", 
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              OUserSelect: "none",
              userSelect: "none"
          }}
          >
            Hint{" "}
            <img
                style={{
                    transition: '.5s ease',
                    width: '15px',
                    transform: hintshow ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                src="/assets/Imgs/AccountPage/arrowdown.png"
                alt=""
                onClick={handlehint}
            />
          </h3>
          <ul className={hintshow ? "showhint" : "hidehint"}  style={{  
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              OUserSelect: "none",
              userSelect: "none"
          }}>
            <li>Use 6 to 64 characters</li>
            <li>
              Besides letters, include at least a number or symbol (!@#%^*-_+=)
            </li>
            <li>Password is case sensitive</li>
            <li>Avoid using the same password for multiple sites</li>
          </ul>
        </div>

        <br />
        <div className="terms-checkbox">
          <input type="checkbox" id="agreeTerms" onChange={(e) => setTermsAgreed(e.target.checked)}/>
          <label htmlFor="agreeTerms" className="agreelabel">
            I agree to the{" "}
            <a href="/TermsOfUse">
              <u>terms</u>
            </a>
            &nbsp; &&nbsp;
            <a href="/PrivacyPolicy">
              <u>policy</u>
            </a>
          </label>
        </div>
        {error?<p style={{color:"crimson",margin:"10px 0",fontSize:"1rem"}}>{error}</p>:null}
        <button className="sign-up-button" onClick={handleSignUp}>
          Sign Up
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
            Sign up with Google
          </button>
          <button className="meta-button" onClick={handleMetaSignIn}>
            <img src="/assets/Imgs/logos/meta.png" alt="Meta" />
            Sign up with Meta
          </button>
          <button className="microsoft-button" onClick={handleMicrosoftSignIn}>
            <img src="/assets/Imgs/logos/microsoft.png" alt="Microsoft" />
            Sign up with Microsoft
          </button>
        </div>

        <p className="haveAnAccount">
          Have an account? <a href="/Login">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
