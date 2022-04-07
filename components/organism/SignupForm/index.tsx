import cx from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setSignUp } from '../../../services_api/auth';

export default function SignupForm() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const className = {
    label: cx('form-label text-lg fw-medium color-palette-1 mb-10')
  }
  //create function signup
  const onSubmit = async () => {
    const userForm = {
      email,
      name,
      username,
      phoneNumber,
      password
    }
    localStorage.setItem('user-form', JSON.stringify(userForm))
    router.push('/sign-up-photo')
  }


  //menggunakan localStorage untuk menyimpan value ke halaman selanjutnya, yg walaupun di refresh pagenya, value tetap ada
  //berbeda dengan redux yg ketika direfresh pagenya maka value akan hilang
  //cara penggunaan : 1. buat varibel isinya object, 2. convert object ke string dilocalStorage


  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
      <p className="text-lg color-palette-1 m-0">Daftar dan bergabung dengan kami</p>
      <div className="pt-50">
        <label className={className.label}>Full Name</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="name"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)} //apapun perubahan pada input akan di set dan dikirim
        />
      </div>

      <div className="pt-30">
        <label className={className.label}>Username</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="username"
          placeholder="Enter your Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)} //apapun perubahan pada input akan di set dan dikirim
        />
      </div>

      <div className="pt-30">
        <label className={className.label}>Phone Number</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="phoneNumber"
          placeholder="Enter your Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)} //apapun perubahan pada input akan di set dan dikirim
        />
      </div>

      <div className="pt-30">
        <label htmlFor="email" className={className.label}>
          Email
          Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)} //apapun perubahan pada input akan di set dan dikirim
        />
      </div>
      <div className="pt-30">
        <label htmlFor="password" className={className.label}>Password</label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} //apapun perubahan pada input akan di set dan dikirim
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type='button'
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          onClick={onSubmit}
        >
          Continue
        </button>

        <Link href="/sign-in">
          <a
            className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
            role="button"
          >
            Sign
            In
          </a>
        </Link>
        <ToastContainer />
      </div>
    </>
  );
}
