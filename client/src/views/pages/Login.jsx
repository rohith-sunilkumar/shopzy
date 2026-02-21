import { Link } from "react-router-dom";

import pic from "../../assets/register.jpg";
import useLoginController from "../../controllers/useLoginController";

const Login = () => {
  const { formData, logging, handleChange, handleSubmit } = useLoginController();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-sans p-6">
      <div className="flex w-full max-w-5xl bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden flex-col-reverse md:flex-row">

        {/* LEFT FORM */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative">

          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8 font-medium">Please enter your details to sign in.</p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-600 font-medium">Remember me</span>
                </label>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={logging}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4"
              >
                {logging ? "Signing in..." : "Sign in to account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors">
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE/BRANDING */}
        <div className="flex-1 relative hidden md:block bg-indigo-50 min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 z-10MIX"></div>
          <img
            src={pic}
            alt="Shopping"
            className="absolute inset-0 w-full h-full object-cover rounded-t-3xl md:rounded-l-none md:rounded-r-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
