import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login submitted', { email, password })
    localStorage.setItem("isLogin", true);
    navigate('/pegawai');

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 flex flex-col md:flex-row md:space-y-0 md:space-x-8 items-center">
        <div className="md:flex-1">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 md:text-left md:text-4xl lg:text-5xl">
            Sistem Manajemen Pegawai
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 md:text-left md:text-base lg:text-lg">
            Kelola pegawai Anda dengan mudah dan efisien
          </p>
        </div>
        <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md md:flex-1">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login ke akun Anda
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Alamat Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Alamat email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Masuk
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Belum punya akun? Daftar di sini
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}