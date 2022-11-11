import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings'
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Rate(props){
    const param = useParams()
    const[rating, setRating] = useState(0);
    useEffect(() =>{
        axios.get('http://localhost:8080/laravel/laravel/public/api/blog/rate/' + param.id)
        .then(res=>{
            const rateAll= res.data.data
            const sumRate = Object.keys(rateAll).length
            let sum = 0;
            if(rateAll){
                Object.keys(rateAll).map((value, key)=>{
                    console.log(rateAll[value]['rate'])
                    
                    sum += rateAll[value]['rate']
                })
                console.log(sum)
                 //    tbc= tong diem rate/tòng so ng danh gia
                 const tbc = sum/sumRate

                setRating(tbc)  
                console.log(tbc)
            }
            
       
        })
      },[])
    
    function changeRating(newRating, name){
        // kiểm tra đăng nhập 
        let userData = localStorage.getItem("Auth");
        // console.log(userData)
        if(userData == null){
            setRating(0)
        }
        else{
            setRating(newRating)
            let url = 'http://localhost:8080/laravel/laravel/public/api/blog/rate/' + param.id;
            const accessTokens = JSON.parse(localStorage.getItem("token"));
            let configs = { 
                headers: { 
                    'Authorization': 'Bearer '+ accessTokens.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                } 
            };
            let user = JSON.parse(userData)
            if(rating){
                const formDataRate = new FormData();
                    formDataRate.append('blog_id', param.id);
                    formDataRate.append('user_id', user.id);
                    formDataRate.append('rate', rating);
                axios.post(url, formDataRate, configs)
                .then(res=>{
                    console.log(res)
                }) 
                
            }
           
		
        }
        
    }
        // click vào đánh giá thì lấy rating truyền vào api 
    // console.log(rating)
    return(
        <StarRatings
            rating={rating}
            starRatedColor="red"
            changeRating={changeRating}
            numberOfStars={6}
            name ='rating'
        />
    )
}
export default Rate;