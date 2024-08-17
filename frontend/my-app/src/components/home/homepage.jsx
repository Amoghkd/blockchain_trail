import { Link } from 'react-router-dom';
import '../../styles/home.css'

 const Home = () => {
    return(
        <>
        <video className='home-video' autoPlay loop muted>
        <source src = "/" type = "video/mp4"/>
    </video>
        <h1 className='home-content'>Welcome to blockchain trail</h1>
        <Link to="/dashboard"><button className='bloglink'>Explore</button></Link>
    </>
    )
}
export default Home;