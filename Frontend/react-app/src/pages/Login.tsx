import { FormEvent, useState } from "react";
import WindowContainer from "../components/WindowContainer/WindowContainer";
import CoolButton from "../components/CoolButton/CoolButton";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    console.log('Email:', email);
    console.log('Password:', password);
    // e.preventDefault();

    // try {
    //   const response = await axios.post('http://localhost:5000/api/auth/login', {
    //     email,
    //     password,
    //   });

    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="h-screen w-screen bg-[#FDDA7B] pt-36 pb-36 flex justify-center items-center"> 
    <WindowContainer headerTitle={"Login"}  headerColor="bg-[#FF9B9B]" >
      <form  className="items-center flex flex-col p-6 w-screen max-w-md px-16" onSubmit={handleSubmit}>
        <img className="rounded-full border-4 border-black h-full mb-8 max-h-40 w-auto" src="https://i.imgur.com/ryW7EFL.png"/>
        <input
          className="bg-white border-4 rounded-2xl w-full p-4 border-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <input
          className="bg-white my-4 border-4 rounded-2xl w-full p-4 border-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <CoolButton size={"small"} onClick={() => console.log("bom")} className="w-5/6 text-center text-2xl font-bold font-PublicSans">
          LOGIN
        </CoolButton>
      </form>
        </WindowContainer>
    </div>
  );
}

export default Login;