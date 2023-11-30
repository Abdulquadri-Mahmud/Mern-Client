import { useSelector } from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {
    getDownloadURL, 
    getStorage, ref, 
    uploadBytesResumable
} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
    const fileRef = useRef(null);
    const { currentUser } = useSelector((state) => state.user);
    const [file, setFile] = useState(null);
    const [uploadFilePercent, setUploadFilePercent] = useState(0);
    const [fileError, setFileError] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (file) {
            handleUploadFile(file)
        }
    }, [file])
    const handleUploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadFilePercent(Math.round(progress));
        },(error) => {
            setFileError(true);
            console.log(error);
        },// get download url 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setFormData({...formData, avatar : downloadURL})
            })
        }
        )
    }

    // state to save files
    
    return ( 
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-8">Profile</h1>
            <form className='flex flex-col gap-4'>
                <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={fileRef} className='hidden' accept='image/*'/>
                <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-1' src={ formData.avatar || currentUser.avatar} alt="profile" />
                <p className='text-sm self-center'>
                    {fileError ? (<span className='text-red-700'>Error while uploading image (image must be less than 2 mb)</span>) 
                    : uploadFilePercent > 0 && uploadFilePercent < 100 ? 
                    (<span className='text-green-500'>{`Uploding ${uploadFilePercent}%`}</span>)
                    : uploadFilePercent === 100 ? (
                        <span>Image successfully uploaded!</span>
                    ) : ( 
                        ''
                    )}
                </p>
                <input type="text" id='username' placeholder='username...' className='border p-3 rounded-lg'/>
                <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg'/>
                <input type="password" id='password' placeholder='password...' className='border p-3 rounded-lg' autoComplete='true'/>
                <button className='bg-slate-700 rounded-lg uppercase hover:opacity-95 p-3 text-white disable:opacity-80'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className="text-red-700 cursor-pointer">Delete account</span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
        </div>
     );
}
 
export default Profile;
