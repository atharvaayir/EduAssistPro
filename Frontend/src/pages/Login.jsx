import Inputbox from "../components/Inputbox";


const Login = ({status}) => {
    if(status===200)
      return (<>App</>)
    else
    return (
    <div className="flex h-screen">
      <Inputbox />
      <div className="w-1/2 aspect-square h-full relative">

        <img
          src="bg.jpg"
          alt=""
          className="h-full as shadow-inner shadow-black"
        />
        <div className="w-full h-full absolute top-0 shadow-[inset_-8px_-8px_80px_#000000f0]" />
      </div>
    </div>
  )
}

export default Login
