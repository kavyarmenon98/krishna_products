import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';
import { loginUserAction } from "../redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/service";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import main_logo from "../assets/logo/png_logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const canvasRef = useRef(null);

  const loginMutation = useMutation({
    mutationFn: loginUserAPI,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginMutation.mutateAsync(values);
        dispatch(loginUserAction(data));
        navigate("/home");
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    },
  });

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Cyan/Blue color for particles
        ctx.fillStyle = `rgba(0, 161, 209, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0f19]">
      {/* Background & Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a2c4e] via-[#0b0f19] to-[#000000] opacity-80" />
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-panel p-10 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden"
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}
        >
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" />

          {/* Logo & Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block relative mb-6"
            >
              <div className="absolute inset-0 bg-[var(--color-primary)] blur-2xl opacity-20 rounded-full" />
              <img src={main_logo} alt="Logo" className="w-50 relative z-10 mx-auto drop-shadow-lg" />
            </motion.div>
            <h2 className="text-2xl font-serif text-white mb-2 tracking-wide">Welcome Back</h2>
            <p className="text-gray-400 text-sm opacity-80">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-7">
            {/* Email Field */}
            <div className="space-y-2.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] font-bold ml-1 opacity-70">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-primary)] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 bg-black/40 border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 focus:ring-4 transition-all duration-300 ${formik.touched.email && formik.errors.email ? "border-red-500/50" : "border-white/5"
                    }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-[11px] ml-1 mt-1 font-medium italic">
                  {formik.errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] font-bold ml-1 opacity-70">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-primary)] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3.5 bg-black/40 border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 focus:ring-4 transition-all duration-300 ${formik.touched.password && formik.errors.password ? "border-red-500/50" : "border-white/5"
                    }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--color-primary)] transition-colors focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-[11px] ml-1 mt-1 font-medium italic">
                  {formik.errors.password}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={loginMutation.isPending}
                whileHover={{ scale: 1.01, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] via-[#00a1d1] to-[#0077b6] text-white font-extrabold text-base shadow-xl hover:shadow-[var(--color-primary)]/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed tracking-widest"
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </span>
                ) : "SIGN IN"}
              </motion.button>
            </div>

            {/* Register Link */}
            <div className="text-center pt-2">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-[var(--color-primary)] hover:text-white transition-all font-semibold underline-offset-4 hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </motion.div>

        {/* Footer Credit (Optional) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/20 text-xs mt-8"
        >
          &copy; {new Date().getFullYear()} Arts & Craft By Kavya. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
};

export default Login;
