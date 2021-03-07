import React,{useContext, useEffect,useState} from 'react';
import Listing from './Listing'
import UserContext from "../../Context/context";
import axios from 'axios'
import apiURL from '../../apiConfig'
const userId = document.cookie.split(";")[1].split('=')[1];

const ListingContainer = () => {
    const { user } = useContext(UserContext);
    const username = "<Name>"
    const listingCount = 3

    const [allListings, setAllListings] = useState([])

    useEffect(()=>{
        const makeApiCall = async () => {
            try {
                const response = await axios(`${apiURL}/api/donoruser`)
                
                setAllListings(response.data.users)
            } catch (error) {
                console.error(error)
            }
        }
        makeApiCall()
    },[])

  

    // const returnUsers = allListings.map((user,key)=>{
    //     console.log("RES: ", user.posts)

    //     // const again = user.posts.map((item,k)=> {
    //     //     console.log(item)
    //     //     return (
    //     //         <Listing listingId={item}/>
    //     //     )
    //     // })
        
    //     user.posts.map((i,k)=> {
    //         return (
    //             <div>
    //                  {i}
    //                  hello
    //             </div>
               
    //         )
    //     })

    //     console.log()
    //     return (
    //                 // <div key={key}>
    //                 //       <div>
    //                 //           <p>{user.username} is donating {listingCount} clothing</p>
    //                 //             <img src={user.image}></img>
    //                 //             <p>{user.description}</p>
    //                 //       </div>
                            
    //                 // </div>
    //                 <div>
                       
    //                 </div>
    //             )
    // })

    
    
    return (
        <>
            <div>
                <div>
                   <p>{username} is donating {listingCount} clothing</p>
                </div>

            </div>
            <div>
                {}
            </div>
        </>
    )
}

export default ListingContainer