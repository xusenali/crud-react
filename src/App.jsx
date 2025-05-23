import { useRef, useState } from 'react'

import './App.css'
function App() {
  let [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users') || '[]')
  );
  let [likedUsers, setLikedUsers] = useState(
    JSON.parse(localStorage.getItem('likedUsers') || '[]')
  );

  let [select, setSelect] = useState('all')

  let filter = useRef(null)

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
    const isHearted = event.target.classList.toggle('text-red-500');

    const id = Number(event.target.getAttribute('data-heart-id'));

    if (isHearted) {
      users.forEach(element => {
        if (id === element.id) {
          const isLiked = likedUsers.some(user => user.id === element.id);
          if (!isLiked) {
            likedUsers.push(element);
            console.log(likedUsers);
            setLikedUsers(likedUsers);
            localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
          }
        }
      });
    } else {
      removeLikedUsers(id);
    }

    function removeLikedUsers(id) {
      likedUsers = likedUsers.filter(user => user.id !== id);
      console.log(likedUsers);
      setLikedUsers(likedUsers);
      localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
    }
    loadHearts()
  }
  function loadHearts() {
    const heartElements = document.querySelectorAll('[data-heart-id]');
    heartElements.forEach(heart => {
      const id = Number(heart.getAttribute('data-heart-id'));
      const isLiked = likedUsers.some(user => user.id === id);
      if (isLiked) {
        heart.classList.add('text-red-500');
      }
    });
  }
  function selectvalue() {
    setSelect(filter.current.value)

  }
  const filteredUsers = select === 'all' ? users : users.filter(item => item.category === select)
  return (
    <>
      <div className='bg-white-400 h-20 w-100% flex justify-between items-center p-5'>
        <h1 className=' text-3xl' >users</h1>
        <div className="icongg flex gap-4">
          <select ref={filter} onChange={selectvalue} name="heartcategory" id="select" className='p-3 border-1 rounded'>
            <option value="all">All</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="relatives">Relatives</option>
            <option value="other">Other</option>
          </select>
          <button onClick={formleft} id='AddBtn' className='p-2.5 rounded bg-blue-600 text-white'>Add</button>
        </div>
      </div>
      <div className="users relative w-100% h-200 shadow-2xl shadow-gray-900 overflow-hidden p-5">
        <ul className=' p-5 flex justify-between'>
          <li className='text-2xl'>FirstName</li>
          <li className='text-2xl'>LastName</li>
          <li className='text-2xl'>Category</li>
          <li className='text-2xl'>PhoneNumber</li>
        </ul>
        {
          filteredUsers.map((value, index) => {
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
