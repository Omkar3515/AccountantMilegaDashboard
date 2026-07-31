import { useState, type SubmitEvent } from "react";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/NewLogo-rebg.png";
import makeInIndia from "../../assets/makeinindia.png";
import "./auth.css";

const SocialIcon = ({label, path, href,}: { label: string; path: string; href: string;}) => (
    <a className="auth-social" href={href} target="_blank" rel="noopener noreferrer" aria-label={label} >
         <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <path d={path} />
         </svg>
    </a>
);

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email === "candidate@test.com" && password === "123456") {
            localStorage.setItem("role", "candidate");
            navigate("/candidate/dashboard");
            return;
        }
        if (email === "employer@test.com" && password === "123456") {
            localStorage.setItem("role", "employer");
            navigate("/employer/dashboard");
            return;
        }
        if (email === "admin@test.com" && password === "123456") {
            localStorage.setItem("role", "admin");
            navigate("/admin/dashboard");
            return;
        }

        alert("Invalid Credentials");
    };

    return (
        <main className="auth-page auth-page--login">
            <header className="auth-topbar">
                <img className="auth-topbar-logo" src={logo} alt="AccountantMilega.com" />
                <div className="auth-socials">
                    <SocialIcon
                        label="Facebook"
                        href="https://www.facebook.com/MSquareSoftware"
                        path="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.2 4.31 15.2 4.22 14 4.22c-2.4 0-4 1.46-4 4.15v2.13H7.5v3H10V21h3.5Z"
                    />
                    <SocialIcon
                        label="WhatsApp"
                        href="https://api.whatsapp.com/send/?phone=9765498660&text&type=phone_number&app_absent=0"
                        path="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.2 14.2c-.22.62-1.28 1.18-1.77 1.24-.45.06-1.02.08-1.65-.1a15 15 0 0 1-1.5-.55c-2.64-1.14-4.36-3.8-4.5-3.98-.13-.18-1.08-1.44-1.08-2.75 0-1.3.68-1.94.92-2.2.24-.27.53-.33.7-.33h.5c.16 0 .38-.06.6.46.22.53.75 1.83.82 1.96.07.13.11.29.02.47-.09.18-.13.29-.27.44-.13.16-.28.35-.4.47-.13.13-.27.27-.12.53.16.27.7 1.16 1.5 1.88 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.13.45.2.51.31.07.11.07.62-.15 1.24Z"
                    />
                    <SocialIcon
                        label="LinkedIn"
                        href="https://www.linkedin.com/in/retesh-karampuri-a686595a?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                        path="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5h-3.55V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
                    />
                    <SocialIcon
                        label="Instagram"
                        href="https://www.instagram.com/msquaresoftware"
                        path="M12 2c2.7 0 3.05.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.85 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.44.54C6.08.29 6.81.12 7.87.07 8.95.01 9.3 0 12 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.17 1.17 0 1 0 0-2.34 1.17 1.17 0 0 0 0 2.34Z"
                    />
                </div>
            </header>

            <div className="auth-center">
                <section className="auth-shell" aria-labelledby="login-title">
                    <a className="auth-brand" href="/">
                        Accountant<span>Milega</span><b>.com</b>
                    </a>
                    <div className="auth-card">
                        <div className="auth-icon">
                            <UserRound size={38} strokeWidth={2.15} />
                        </div>
                        <h1 id="login-title">Login</h1>
                        <p className="auth-subtitle">Login to your account to continue</p>
                        <form onSubmit={handleSubmit}>
                            <label className="auth-field">
                                <UserRound size={20} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Email or Mobile Number"
                                    aria-label="Email or Mobile Number"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <label className="auth-field">
                                <LockKeyhole size={19} />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    aria-label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </label>
                            <div className="auth-options">
                                <label>
                                    <input defaultChecked type="checkbox" />
                                    <span>Remember Me</span>
                                </label>
                                <a href="#forgot-password">Forgot Password?</a>
                            </div>
                            <button className="auth-submit" type="submit">
                                Login
                            </button>
                        </form>
                        <div className="auth-divider">
                            <span />
                            <em>or</em>
                            <span />
                        </div>
                        <button className="google-button" type="button">
                            <span className="google-mark">G</span> Continue with Google
                        </button>
                        <div className="auth-register">
                            <strong>New to AccountantMilega?</strong>
                            <p>Register as a Candidate or Employer</p>
                            <button type="button" onClick={() => navigate("/register")}>
                                Register Now <span>→</span>
                            </button>
                        </div>
                    </div>
                </section>

                <div className="auth-pride">
                    <p>
                        We Make In <span>India</span> With Pride
                    </p>
                    <img src={makeInIndia} alt="Make in India" />
                </div>
            </div>

            <footer className="auth-footer">
                Product of MSquare Software | © 2026 All Rights Reserved | Proudly Make In India
            </footer>
        </main>
    );
};

export default Login;
