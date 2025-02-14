import Inputbox from "../components/Inputbox";


const Login = ({status}) => {
    if(status===200)
      return (<>App</>)
    else
    return (
    <div className="flex h-screen">
      <Inputbox />
      <img
        width="50%"
        src="bg.jpg"
        alt=""
        className="aspect-square"
      />
    </div>
  )
}

export default Login
