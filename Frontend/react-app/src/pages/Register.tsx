import { FormEvent, useState } from "react";
import WindowContainer from "../components/WindowContainer/WindowContainer";
import CoolButton from "../components/CoolButton/CoolButton";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/betterLogo.svg";


const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    console.log('Email:', e);
    console.log('Password:', password);
  };

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#FDDA7B] pt-36 pb-36 flex justify-center items-center"> 
          <div className="flex flex-col items-center w-full h-full justify-center">
      <img src={Logo} alt="Logo" className="mb-8"/>
    <WindowContainer headerTitle={"Register"}  headerColor="bg-[#FF9B9B]" >
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
          type="username"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <input
          className="bg-white mb-4 border-4 rounded-2xl w-full p-4 border-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <CoolButton size={"small"} onClick={() => console.log("bom")} className="w-5/6 text-center text-2xl font-bold font-PublicSans">
          REGISTER
        </CoolButton>
      </form>
      <a>
          <p className="text-center mb-8 text-black">
            Já tem uma conta? 
            <span onClick={() => navigate("/login")} className="text-blue-700 ml-2 hover:cursor-pointer">Entre!</span>
          </p>
      </a>
        </WindowContainer>
    </div>
    </div>
  );
}

export default Register;