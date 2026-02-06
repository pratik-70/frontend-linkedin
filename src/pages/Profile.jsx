import React, {useState} from 'react'
import {useSelector} from 'react-redux'

const Profile = () => {


  // state variables for form fields

  const [headline, setHeadline] = useState("")
  const [summary, setSummary] = useState("")

  const [companyName, setCompanyName] = useState("")
  const [joiningDate, setJoiningDate] = useState("")
  const [lastDate, setLastDate] = useState("")
  const [description, setDescription] = useState("")

  // const [skills, setSkills] = useState([])

  const [schoolName, setSchoolName] = useState("")
  const [session, setSession] = useState("")

  // currentUser

  const {currentUser} = useSelector((state) => state.user)

  const handleUpdateProfile = async(e) => {
    try {
      e.preventDefault();
      const response = await axios.post("https://backend-linkedin.vercel.app/api/create-profile",
        {headline, userId: currentUser._id, summary,
            experience : {
              companyName,
              joiningDate,
              lastDate,
              description
            },
            education : {
              schoolName,
              session
            }   
        }
      );
      console.log("response", response);
      if(response.data.profile) {
        return alert("Profile Updated Successfully")
      }
    } catch (err) {
      console.log("err", err.message);
    }
  }


  return (
    <div >
      <h1 className='text-5xl font-semibold italic ml-20 mt-10'>Hi!,{" " + currentUser?.username}</h1>


<div className='flex justify-center items-center'>
      <form onSubmit={handleUpdateProfile} className='flex flex-col gap-4 mt-8 border-2 border-gray-800 rounded-2xl py-30 px-60'>

        <h1 className='text-2xl font-semibold'>Update Profile</h1>
        <input onChange={(e) => setHeadline(e.target.value)} className='p-4 text-lg border-2 border-black outline-none rounded-lg' type="text" placeholder='headline'/>

        <input onChange={(e) => setSummary(e.target.value)} className='p-4 text-lg border-2 border-black outline-none rounded-lg' type="text" placeholder='summary'/>

        {/* Experience -> 4 fields */}

        <input onChange={(e) => setCompanyName(e.target.value)} className='p-4 text-lg border-2 border-black outline-none rounded-lg' type="text" placeholder='company'/>

        <input onChange={(e) => setJoiningDate(e.target.value)} className='p-4 text-lg border-2 border-black outline-none rounded-lg' type="text" placeholder='joining date'/>

        <input onChange={(e) => setLastDate(e.target.value)} className='p-4 text-lg border-2 border-black outline-none rounded-lg'   type="text" placeholder='Last date'/>

        <input onChange={(e) => setDescription(e.target.value)} className='p-4 text-lg border-2 border-black outline-none rounded-lg' type="text" placeholder='description'/>

        {/* skills */}

        {/* <input onChange={(e) => setSkills(e.target.value.split(","))} className='p-4 text-lg border-2 border-black outline-none rounded-lg' type="text" placeholder='skills'/> */}

        {/* Education -> 4 fields */}

        <input onChange={(e) => setSchoolName(e.target.value)} className='p-4 text-lg border-2 border-black outline-none rounded-lg'   type="text" placeholder='School Name'/>

        <input onChange={(e) => setSession(e.target.value)} className='p-4 text-lg border-2 border-black outline-none rounded-lg' type="text" placeholder='session'/>

        <button className='p-4 text-lg bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600'>Save</button>

      </form>
      </div>
    </div>
  )
}

export default Profile