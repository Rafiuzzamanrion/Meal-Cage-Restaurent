import {useContext} from "react";
import {AuthContext} from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import {useLocation, useNavigate} from "react-router-dom";
import UseCart from "../../Hooks/UseCart";



const FoodCard = ({item}) => {
    const {name,image,recipe,price,_id} = item;
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation();
    // ======== here comma (,) is used because refetch can not use alone without data(cart) ==========
    const [,refetch] = UseCart();
   

    const handleAddToCart = item =>{
      item
      if(user && user.email){
        const cartItem = {foodId:_id, name,image,price,email:user.email} 
        fetch('http://localhost:5000/carts',{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data =>{
          if(data.insertedId){
            refetch();
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Successfully added to cart",
              showConfirmButton: false,
              timer: 1200,
            });
          }
        })
      }
      else{
        Swal.fire({
          title: 'Please log in first to order !!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#54B4D3',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Log in now'
        }).then((result) => {
          if (result.isConfirmed) {
           navigate('/login',{state:{from:location}})
          }
        })
      }
    
    }
    return (
        <div>
           <div className="card w-96 bg-base-100 shadow-xl mt-6">
  <figure><img  src={image} alt="" /></figure>
  <div className="card-body">
    <h2 className="card-title text-success">{name}</h2>
    <p>{recipe}</p>
    <p className="text-success font-semibold">${price}</p>
    <div className="card-actions justify-end">
      <button onClick={()=>handleAddToCart(item)} className="btn btn-outline btn-success border-b-8 hover:bg-success">Add to cart</button>
    </div>
  </div>
</div> 
        </div>
    );
};

export default FoodCard;