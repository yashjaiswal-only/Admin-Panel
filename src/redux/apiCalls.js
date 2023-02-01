import { publicRequest, userRequest } from "../requestMethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./UserRedux"

export const updateUser= async (id,user)=>{//just api calling no redux involve
    try{
        const res=await userRequest.put('/users/'+id,user)
        console.log(res); 
    }
    catch(err){
        console.log(err)
    }
}
export const register= async (user)=>{//just api calling no redux involve
    try{
        const res=await publicRequest.post('/auth/register',user)
        console.log(res); 
    }
    catch(err){
        console.log(err)
    }
}
export const login= async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res=await publicRequest.post('/auth/login',user)
        // console.log(res);
        dispatch(res.data.isAdmin?loginSuccess(res.data):loginFailure());
    }
    catch(err){
        dispatch(loginFailure());
        // console.log(err)
    }
}

export const getUsers= async (dispatch)=>{
  dispatch(getProductStart());
  try{
      // console.log(user);
      const res=await userRequest.get('/users')
      // console.log(res);
      dispatch(getProductSuccess(res.data));
  }
  catch(err){
      dispatch(getProductFailure());
      // console.log(err)
  }
}

export const getProducts= async (dispatch)=>{
    dispatch(getProductStart());
    try{
        // console.log(user);
        const res=await publicRequest.get('/products')
        // console.log(res);
        dispatch(getProductSuccess(res.data));
    }
    catch(err){
        dispatch(getProductFailure());
        // console.log(err)
    }
}

export const deleteProducts= async (id,dispatch)=>{
    dispatch(deleteProductStart());
    try{
        // const res=await userRequest.delete('/products/'+id)
        dispatch(deleteProductSuccess(id));
    }
    catch(err){
        dispatch(deleteProductFailure());
    }
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      // update
      dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
