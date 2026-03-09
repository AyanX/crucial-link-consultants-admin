import React, { useState, useCallback } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./LoginPage.scss";
import logo from "../../../assets/logo.webp"
const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Field-level validation
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailError =
    emailTouched && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ? "Please enter a valid email address."
      : null;
  const passwordError =
    passwordTouched && password.length < 6
      ? "Password must be at least 6 characters."
      : null;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setEmailTouched(true);
      setPasswordTouched(true);
      setError(null);

      if (emailError || passwordError || !email || !password) return;

      setIsSubmitting(true);
      await login({ email, password, rememberDevice }, (msg) => setError(msg));
      setIsSubmitting(false);

      // If login set user, navigate away
      navigate("/dashboard");
    },
    [
      email,
      password,
      rememberDevice,
      emailError,
      passwordError,
      login,
      navigate,
    ],
  );

  return (
    <div className="login-page">
      <div className="login-page__inner">
        {/* Brand */}
        <div className="login-brand">
          <div className="sidebar__logo">
				<div className="logo-icon">
					<img src={logo} alt="CLC Logo" className="logo-image" style={{width:"50px", height:"40px", borderRadius:"5px", objectFit:"cover"}}/>
				</div>
				<div className="logo-text">
					<span className="logo-name logo-text-login" >CLC Admin</span>
					<span className="logo-sub logo-text-login">Crucial Link Consultants</span>
				</div>
			</div>
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="login-card__header">
            <h2 className="login-card__title">Consultant Portal Login</h2>
            <p className="login-card__subtitle">
              Please enter your credentials to access your dashboard
            </p>
          </div>

          {/* Global error */}
          {error && (
            <div className="login-error">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div
              className={`login-field ${emailError ? "login-field--error" : ""}`}
            >
              <div className="login-field__top">
                <label className="login-field__label" htmlFor="email">
                  Email Address
                </label>
                <span className="login-field__required">Required</span>
              </div>
              <div className="login-field__input-wrap">
                <span className="login-field__icon">
                  <Mail size={15} />
                </span>
                <input
                  id="email"
                  className="login-field__input"
                  type="email"
                  placeholder="e.g., name@clc.com"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                />
              </div>
              {emailError && (
                <span className="login-field__error-msg">{emailError}</span>
              )}
            </div>

            {/* Password */}
            <div
              className={`login-field ${passwordError ? "login-field--error" : ""}`}
            >
              <div className="login-field__top">
                <label className="login-field__label" htmlFor="password">
                  Password
                </label>
                <button type="button" className="login-field__forgot">
                  Forgot Password?
                </button>
              </div>
              <div className="login-field__input-wrap">
                <span className="login-field__icon">
                  <Lock size={15} />
                </span>
                <input
                  id="password"
                  className="login-field__input login-field__input--password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                />
                <button
                  type="button"
                  className="login-field__toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {passwordError && (
                <span className="login-field__error-msg">{passwordError}</span>
              )}
            </div>

            {/* Remember device */}
            <label className="login-remember">
              <input
                type="checkbox"
                className="login-remember__checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
              />
              <span className="login-remember__box">
                {rememberDevice && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </span>
              <span className="login-remember__label">
                Remember this device
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className={`login-submit ${isSubmitting ? "login-submit--loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" /> Signing in…
                </>
              ) : (
                "Login to Portal"
              )}
            </button>
          </form>

    
        </div>

        {/* Page footer */}
        <footer className="login-page__footer">
          <p className="login-page__copyright">
            © 2026 Crucial Link Consultants Limited. All rights reserved.
          </p>
          <nav className="login-page__links">
            <button type="button">Privacy Policy</button>
            <span className="login-page__link-sep">·</span>
            <button type="button">Terms of Service</button>
            <span className="login-page__link-sep">·</span>
            <button type="button">Contact Support</button>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
