import { Link } from "react-router-dom";

import register from "../../assets/register.jpg";
import useRegisterController from "../../controllers/useRegisterController";

const Register = () => {
  const { formData, loading, handleChange, handleSubmit } = useRegisterController();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-sans p-6">
      <div className="flex w-full max-w-5xl bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden flex-col md:flex-row">

        {/* LEFT IMAGE/BRANDING */}
        <div className="flex-1 relative hidden md:block bg-indigo-50 min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 z-10MIX"></div>
          <img
            src={register}
            alt="Register"
            className="absolute inset-0 w-full h-full object-cover rounded-t-3xl md:rounded-r-none md:rounded-l-3xl"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex-1 p-10 md:p-12 flex flex-col justify-center relative">

          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500 mb-6 font-medium">Join us to start shopping today.</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-2"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 font-medium">
              Already have an account?{" "}
              <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
