import React, {useEffect, useState} from 'react';
import axios from 'axios';
import apiURL from '../../apiConfig'

const userId = document.cookie.split(";")[1].split('=')[1];

const Listing = (props) => {
    console.log("pROPS: ", props)
    console.log(props.listingId)
    
    const [listingData, setListingData] = useState()
    const [listings, setListings] = useState([])
    useEffect(()=> {

        const getListingByUser = async () => {

            try {
                const res = await axios(`${apiURL}/api/donoruser/${userId}`)
                

                const temp = []
                res.data.posts.map(async (item)=>{
                    const postRes = await axios(`${apiURL}/api/listings/${item}`)
                    temp.push(postRes.data)
                    
                })
                setListings(temp)

            } catch (err) {
                console.error(err);
            }
        }
        getListingByUser()
    },[userId])


    
    const renderListings = listings.map((item,key)=>{
       

        return (
            <div key={key}>
            <img src={item.image}></img>
            <p>{item.description}</p>
            
            </div>
        )
    })
    
    
    return (
        <>
           <ul>
               {renderListings}
           </ul>
        </>
    )
}

export default Listing