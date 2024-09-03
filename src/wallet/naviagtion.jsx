import { Link } from "react-router-dom"
const Navigation=()=>{
    return(
        <header>
            <div className="logo">supply </div>
            <nav>
                <ul>
                <li>
                        <Link className="nav_link" to="/">Wallet</Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/view-product">View Products</Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/create-product">Create product</Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/update-product">Update product</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Navigation