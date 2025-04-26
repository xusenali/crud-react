import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  let [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users') || '[]')
  );
  let [likedUsers, setLikedUsers] = useState(
    JSON.parse(localStorage.getItem('likedUsers') || '[]')
  );


  function formleft() {
    const form = document.querySelector('form')
    form.style.right = '0'

  }


  function addusers(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    let formdata = new FormData(form);

    let obj = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      firstname: formdata.get('firstname'),
      lastname: formdata.get('lastname'),
      category: formdata.get('select'),
      phoneNum: formdata.get('phone')
    };

    setUsers([...users, obj]);
    localStorage.setItem('users', JSON.stringify([...users, obj]));

    form.style.right = '-400px';


    form.reset();
  }
  function deleteUsers(event) {
    let id = event.target.getAttribute('data-id');

    users = users.filter(user => user.id != id);


    setUsers(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  function addheart(event) {
    event.target.classList.toggle('text-red-500');
   
    const id = Number(event.target.getAttribute('data-heart-id'));

    
  }
  return (
    <>
      <div className='bg-white-400 h-20 w-100% flex justify-between items-center p-5'>
        <h1 className=' text-3xl' >users</h1>
        <button onClick={formleft} id='AddBtn' className='p-2.5 rounded bg-blue-600 text-white'>Add</button>
      </div>
      <div className="users relative w-100% h-200 shadow-2xl shadow-gray-900 overflow-hidden p-5">
        <ul className=' p-5 flex justify-between'>
          <li className='text-2xl'>FirstName</li>
          <li className='text-2xl'>LastName</li>
          <li className='text-2xl'>Category</li>
          <li className='text-2xl'>PhoneNumber</li>
        </ul>
        {users.map((value, index) => {
          return (
            < ul key={index + 1} className='p-6 flex justify-between border-b relative ' >
              <div className="btnlar  absolute right-2 top-2 flex gap-3">
                <i onClick={addheart} data-heart-id={value.id} className='bx bxs-heart text-gray-400' ></i>
                <i onClick={deleteUsers} data-id={value.id} className='bx bxs-box text-red-500'></i>
              </div>

              <li key={value.firstname} className='text-2xl'>{value.firstname}</li>
              <li key={value.lastname} className='text-2xl'>{value.lastname}</li>
              <li key={value.category} className='text-2xl'>{value.category}</li>
              <li key={value.phoneNum} className='text-2xl'>{value.phoneNum}</li>
            </ul>

          )

        })}
        <form onSubmit={addusers} className='items-center justify-center gap-5 flex flex-col  w-80 h-100 shadow-2xl shadow-gray-700 absolute right-[-400px] top-0 transition-all ease-in-out duration-300 rounded-2xl bg-white z-3'>
          <input required minLength={4} name='firstname' className='border-1 p-4 rounded' type='text' placeholder='FirstName...' />
          <input required minLength={4} name='lastname' className='border-1 p-4 rounded' type='text' placeholder='LastName...' />
          <select className='w-50 border-1 p-4 rounded' name="select" id="select">
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="relatives">Relatives</option>
            <option value="other">Other</option>
          </select>
          <input required minLength={4} name='phone' className='border-1 p-4 rounded' type="text" placeholder='Phone...' />
          <button className='p-3  text-white w-55 rounded items-center text-2xl bg-orange-400'>Submit</button>
        </form>
      </div >

    </>
  )
}

export default App
