/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-redundant-roles */
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../components/atoms/Input';
import Sidebar from '../../components/organism/Sidebar';
import { JWTPayloadTypes, UserTypes } from '../../services_api/data-types';
import { updateProfile } from '../../services_api/member';

interface UserStateTypes{
  id:string,
  name:string,
  email:string,
  avatar:any
}

export default function EditProfile() {
  const [user, setUser] = useState<UserStateTypes>({
    id:'',
    name: '',
    email: '',
    avatar: ''
  })
  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      //atob berguna untuk decode token dari btoa
      const jwtToken = atob(token)
      const payload: JWTPayloadTypes = jwtDecode(jwtToken)
      const userFromPayload: UserTypes = payload.player
      // user.avatar = `${userFromPayload.avatar}`
      setUser(userFromPayload)
    }
  }, [])
  const img = process.env.NEXT_PUBLIC_IMG
  const [imagePreview, setImagePreview] = useState('/')
  const router = useRouter()
  const onSubmit = async () => {
    const data = new FormData()
    data.append('image', user.avatar)
    data.append('name', user.name)
    const response = await updateProfile(data, user.id)
    if(response.error){
      toast.error(response.message)
    }else{
      Cookies.remove('token')
      router.push('/sign-in')
      
    }
  }
  return (
    <>
      <section className="edit-profile overflow-auto">
        <Sidebar activeMenu="settings" />
        <main className="main-wrapper">
          <div className="ps-lg-0">
            <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
            <div className="bg-card pt-30 ps-30 pe-30 pb-30">
              <form action="">
                <div className="photo d-flex">
                  <div className="image-upload">
                    <label htmlFor="avatar">
                      {imagePreview === '/' ? (
                        <img src={`${img}/${user.avatar}`} width={90} height={90} alt="ic-upload" style={{ borderRadius: '100%' }} />
                        ) :
                        <img src={imagePreview} width={90} height={90} alt="ic-upload" style={{ borderRadius: '100%' }} />
                      }
                    </label>
                    <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg"
                      onChange={(event) => {
                        const img = event.target.files![0]
                        setImagePreview(URL.createObjectURL(img))
                        return setUser({
                          ...user,
                          avatar: img
                        })
                      }}
                    />

                  </div>
                </div>
                <Input label="Full Name"
                  id="name"
                  nametype="name"
                  value={user.name}
                  onChange={(event) => setUser({
                    ...user, //value user yg lama dicopy
                    name: event.target.value // kemudian diisi dengan value yg baru
                  })} />
                <Input label="Email Address" nametype="email" id="email" disabled value={user.email} />
                {/* <Input label="Phone" nametype="tel" id="phone" /> */}
                <div className="button-group d-flex flex-column pt-50">
                  <button type="button" className="btn btn-save fw-medium text-lg text-white rounded-pill" onClick={onSubmit}>
                    Save My Profile
                  </button>
                </div>
              </form>

            </div>

          </div>
        </main>
      </section>
    </>
  );
}
