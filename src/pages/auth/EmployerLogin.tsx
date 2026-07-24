import { useState, type SubmitEvent } from "react";
import { Building2, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const EmployerLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => { event.preventDefault(); navigate("/employer/dashboard"); };
    return <main className="auth-page auth-page--employer">
        <div className="auth-dots auth-dots--top" />
        <div className="auth-curve auth-curve--top" />
        <div className="auth-curve auth-curve--bottom" />
        <section className="auth-shell" aria-labelledby="employer-login-title">
            <a className="auth-brand" href="/">Accountant<span>Milega</span><b>.com</b></a>
            <div className="auth-card">
                <div className="auth-icon">
                    <Building2 size={38} strokeWidth={2.15} />
                    </div><h1 id="employer-login-title">Employer Login</h1>
                    <p className="auth-subtitle">Login to your account and manage your hiring</p>
                    <form onSubmit={handleSubmit}><label className="auth-field"><UserRound size={20} />
                    <input required type="text" placeholder="Email or Mobile Number" aria-label="Email or Mobile Number" />
                    </label><label className="auth-field"><LockKeyhole size={19} />
                    <input required type={showPassword ? "text" : "password"} placeholder="Password" aria-label="Password" />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} 
                           onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                           </label><div className="auth-options"><label><input defaultChecked type="checkbox" /> 
                           <span>Remember Me</span></label><a href="#forgot-password">Forgot Password?</a>
                           </div>
                        <button className="auth-submit" type="submit">Login</button>
                    </form>
                    <div className="auth-divider"><span /> <em>or</em> <span /></div>
                    <button className="google-button" type="button"><span className="google-mark">G</span> Continue with Google</button>
                    <div className="auth-register"><strong>New to AccountantMilega?</strong>
                    <p>Register your business for just ₹2,999 / Year</p><button type="button">Register Now <span>→</span></button></div></div></section>
                    </main>;
};
export default EmployerLogin;
