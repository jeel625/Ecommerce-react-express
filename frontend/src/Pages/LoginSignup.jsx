import React,{useState} from 'react'
import '../Pages/CSS/LoginSignup.css'
export const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const[formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onStateChange = () => {
    setState(prevState => {
      const nextState = prevState === "Login" ? "Sign Up" : "Login";
      console.log(nextState);
      return nextState;
    });
  };

  const loginSingUp = async () => {
    if(state=== "Login"){

      let responseData;
      await fetch('http://localhost:4000/login',{
        method:'POST',
        headers:{
          Accept :'applicatoin/json',
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(formData),
      }).then((response) => response.json()).then((data) => responseData=data)
      
      if(responseData.success){ // If this is true mean tokens has been generated
        localStorage.setItem('auth-token',responseData.token); //auth-token is the keyName
        window.location.replace("/") //We are sending the user to the Home page by window.locaiton.replace
      }else{
        alert(responseData.errors);
      }

    }else{

      let responseData;
      await fetch('http://localhost:4000/signup',{
        method:'POST',
        headers:{
          Accept :'applicatoin/json',
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(formData),
      }).then((response) => response.json()).then((data) => responseData=data)
      
      if(responseData.success){ // If this is true mean tokens has been generated
        localStorage.setItem('auth-token',responseData.token); //auth-token is the keyName
        window.location.replace("/") //We are sending the user to the Home page by window.locaiton.replace
      }else{
        alert(responseData.errors);
      }
    }
  }

  return (
    <div className='loginsingup'>
      <div className="loginsingup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"&&<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={loginSingUp}>Continue</button>
        <p className="loginsignup-login">
          {state === "Login" ? "Create an Account? ":"Already have an account? "}<span onClick={onStateChange}>{state === "Login"?"Sing Up here..":"Login here..."}</span>
        </p>
        <div className="loginsingup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By Continuing, I agree to the term of use & privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}
