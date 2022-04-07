import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLogin } from '../../../services_api/auth';
import Cookie from 'js-cookie'

export default function SigninForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const onSubmit = async () => {
    const data = {
      email,
      password
    }
    if (!email || !password) {
      toast.error('Silahkan isi input yg tersedia')
    }
    else {
      const response = await setLogin(data)
      if (response.error) {
        toast.error(response.message)
      } else {
        toast.success('Login Berhasil')
        const token = response.data.token // simpan token
        const tokenBase64 = btoa(token)

        //cara decode token
        // const dataUser = jwt_decode(token)
        Cookie.set('token', tokenBase64, { expires: 1 })
        router.push('/')
      }
    }
  }


  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">Masuk untuk melakukan proses top up</p>
      <div className="pt-50">
        <label className="form-label text-lg fw-medium color-palette-1 mb-10">
          Email
          Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          name="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="pt-30">
        <label
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          name="password"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
          type="button"
          onClick={onSubmit}
        >
          Continue to Sign In
        </button>

        <Link href="sign-up">
          <a
            className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
          >
            Sign
            Up
          </a>
        </Link>
      </div>
    </>
  );

}

