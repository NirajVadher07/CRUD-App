import React , {useState, useEffect} from 'react'
import axios from 'axios'

const UserList = () => {
  const [userData, setuserData] = useState(null)

  const fetchUserData = async () =>{
    const resp =  await axios.get("http://localhost:4000/getUsers");
    console.log(resp)
    
    if(resp.data.users.length>0){
      setuserData(resp.data.users);
    }
  }

  useEffect(()=>{
    fetchUserData();
  }, [userData])

  //edit
  const handleEdit = async (user) =>{
    const userName = prompt("Enter new Name")
    const userEmail = prompt("Enter new Email")

    if(!userName || !userEmail){
      alert("please enter name and email")
    }else{
      const resp  = await axios.put(`http://localhost:4000/editUser/${user._id}`, {
        name:userName,
        email: userEmail
      })
      console.log(resp)
    }
  };

  //delete
  const handleDelete = async (userID) =>{
    const resp = await axios.delete(`http://localhost:4000/deleteUsers/${userID}`)
    console.log(resp)
  }

  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-8">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
          All Users
        </h1>
      </div>
      <div className="lg:w-2/3 w-full mx-auto overflow-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                Name
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Email
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Edit
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            { userData && userData.map((user)=>(
              <tr>
                <td className="px-4 py-3 text-white">{user.name}</td>
                <td className="px-4 py-3 text-white">{user.email}</td>
                <td className="px-4 py-3">
                  <button className="text-stone-500 hover:text-green-500" onClick={()=>{handleEdit(user)}}>Edit</button>
                </td>
                <td className="px-4 py-3 text-lg text-gray-900">
                  <button className="text-stone-500 hover:text-red-500" onClick={()=>{handleDelete(user._id)}}>Delete</button>
                </td>
              </tr>
            ))}            
          </tbody>
        </table>
      </div>
    </div>
  </section>

  )
}

export default UserList
