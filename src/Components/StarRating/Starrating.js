import { Star } from '@material-ui/icons'
import {useState} from 'react'
import './starrating.css'

function Starrating() {
    const [rating , setRating] = useState(null)
    const [hover , setHover] = useState(null)
    return (
        <div>
            {[...Array(5)].map((star,i) => {
                const ratingValue = i + 1;

                return <label>
                    <input className="radioz" type="radio" name="rating" value={ratingValue} onClick={()=>setRating(ratingValue)}/>
                    <Star className={ratingValue <= (hover || rating) ? "starz1" : "starz2"}  
                        onMouseEnter={()=> setHover(ratingValue)}
                        onMouseLeave={()=> setHover(null)}>
                     </Star>
                    </label>
            })}
            {/* <p>The rating is.{rating}</p> */}
        </div>
    )
}

export default Starrating
