import React, { useState } from 'react'
import { useStateValue } from '../Context/StateProvider';
import {motion} from 'framer-motion'
import moment from "moment";
import { changeUserRole,getAllUser } from '../api';
import {actionType} from "../Context/reducer"





export const DashboardUserCard = ({data,index}) => {
  console.log(data,index);
  const createdAt = moment(new Date(data.createdAt)).format("MMM Do YY")
  const  [{user,allUser},dispatch ] = useStateValue()

  const [isUserRoleUpdated,setIsUserRoleUpdated]=useState(false);

const  updateUserRole =(userId, role)=>{
  setIsUserRoleUpdated(true)
  console.log(userId,role)
   changeUserRole(userId,role).then((res)=>{
    if(res){
      getAllUser().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.users
        });
        // console.log(data.users); 
      })
    }
   })
}

  return (
    <motion.div 
    key={index}
      className='relative w-full rounded-md flex  items-center px-2 py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'
    >
      <div className='w-275 min-w-[160px] flex items-center justify-center'>        
          <img src={data.imageURL} alt="ima"  className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'/>        
      </div>
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.name}</p>
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.email}</p>
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.email_verfied?"True":"False"}</p>
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{createdAt}</p>
      
      <div className='w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative'>
            <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.role}</p>            
              {data.role==="admin"? "admin":"member"}
              {
                data._id !== user?.user._id&&(
                  <motion.p whileTap={{scale:0.75}} 
                  className='text-[10px] font-semibold text-textColor px-1 bg-black rounded-sm hover:shadow-md'
                  onClick={()=>
                    setIsUserRoleUpdated(true)
                  }>
                      {data.role==="admin"?"member":"admin"}
                  </motion.p>
                )
              }     
              {isUserRoleUpdated&&(
                 <motion.div 
                 initial={{opacity:0, scale:0.5 }}
                 animate={{opacity:1, scale:1}}
                 exit={{opacity:0, scale:0.5}}
                 className='absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md'>
                 <p className='text-textColor text-sm font-semibold'> 
                    Do you want to make this user an 
                     <span>{data.role === "admin"? " member":" admin"}</span>?
                </p>        
               <div className='flex items-center gap-4'>
                    <motion.button 
                    whileTap={{scale:0.75}}
                     className='outline-none border-none text-sm px-4 py-1 rounded-md bg-black text-textColor hover:shadow-md' 
                     onClick={() =>
                      updateUserRole(
                        data._id,
                        data.role === "admin" ? "member" : "admin"
                      )
                    }>
                      Yes
                    </motion.button>
                    <motion.button 
                    whileTap={{scale:0.75}} 
                    onClick={()=>{setIsUserRoleUpdated(false)}}
                    className='outline-none border-none text-sm px-4 py-1 rounded-md bg-black text-textColor hover:shadow-md'>
                      No
                    </motion.button>
               </div>
              </motion.div> 
              ) }     
              
          </div>   
    </motion.div>
    // <div>hi there</div>
  ) 
}


const DashboardUser = () => {
    const  [{allUsers},dispstch ] = useStateValue()
    
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border-gray-300 rounded-md gap-3">
          <div className='absolute top-4 left-4'>
                <p className='text-sm font-bold'>
                      count : <span className='text-xl font-bold text-textColor'>{allUsers?.length}</span>
                </p>
          </div>

          <div className='w-full min-w-[750px] flex items-center justify-between'>          
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>          
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>          
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>          
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>          
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</p>          
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>
          </div>
          {
            allUsers &&(              
              allUsers?.map((data,i ) => (
                  <DashboardUserCard data={data} index={i}/>
               ))
            )
          }
      </div>
    </div>
  )
}


export default DashboardUser
