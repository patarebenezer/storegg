import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { setSignUp } from '../services_api/auth';
import { CategoryTypes } from '../services_api/data-types';
import { getGameCategory } from '../services_api/player';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([])
  const [favorite, setFavorite] = useState('')
  const [image, setImage] = useState<any>('')
  const [imagePreview, setImagePreview] = useState<any>(null)
  const [localForm, setLocalForm] = useState({
    name: '',
    email: ''
  })
  const router = useRouter()

  const getGameCategoryAPI = useCallback(async () => {
    const data = await getGameCategory()
    setCategories(data)
    setFavorite(data[0]._id)
  }, [getGameCategory])

  useEffect(() => {
    getGameCategoryAPI()
  }, [])

  useEffect(() => {
    const localForm = localStorage.getItem('user-form')
    setLocalForm(JSON.parse(localForm!))
  }, [])

  const onSubmit = async () => {
    //get data dari form sign up sebelumnya :
    const localForm = await localStorage.getItem('user-form');
    const form = JSON.parse(localForm!); //parse supaya jadi object
    const data = new FormData(); // buat data baru

    // gabungkan semua datanya pake append
    data.append('image', image)
    data.append('email', form.email)
    data.append('password', form.password)
    data.append('phoneNumber', form.phoneNumber)
    data.append('username', form.username)
    data.append('name', form.name)
    data.append('role', 'user')
    data.append('status', 'Y')
    data.append('favorite', favorite)

    const result = await setSignUp(data)

    if (result.error === 1) {
      toast.error(result.message)
    } else {
      toast.success('Anda berhasil mendaftar')
      router.push('/sign-up-success')
      localStorage.removeItem('user-form') // hapus data yg ada di local 
    }
  }
  return (
    <>
      <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
        <div className="container mx-auto">
          <form action="">
            <div className="form-input d-md-block d-flex flex-column">
              <div>
                <div className="mb-20">
                  <div className="image-upload text-center">
                    <label htmlFor="avatar">
                      {imagePreview ?
                        <img src={imagePreview} alt="upload-icon" className='img-upload' width={120} height={120} /> :
                        <Image src="/icon/upload.svg" alt="upload-icon" width={120} height={120} />
                      }
                    </label>
                    <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg"
                      onChange={(event) => {
                        const img = event.target.files![0]
                        setImagePreview(URL.createObjectURL(img))
                        return setImage(img)
                      }}
                    />
                  </div>
                </div>
                <h2 className="fw-bold text-xl text-center color-palette-1 m-0">{localForm.name}</h2>
                <p className="text-lg text-center color-palette-1 m-0">{localForm.email}</p>
                <div className="pt-50 pb-50">
                  <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">
                    Favorite
                    Game
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select d-block w-100 rounded-pill text-lg"
                    aria-label="Favorite Game"
                    value={favorite}
                    onChange={(event) => setFavorite(event.target.value)}
                  >
                    {categories.map((category: CategoryTypes) => {
                      return <option key={category._id} value={category._id}>{category.name}</option>
                    })}
                  </select>
                </div>
              </div>

              <div className="button-group d-flex flex-column mx-auto">
                <button
                  className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                  type='button'
                  onClick={onSubmit}
                >
                  Create My Account
                </button>
                <a
                  className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                  href="#"
                  role="button"
                >
                  Terms &
                  Conditions
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
