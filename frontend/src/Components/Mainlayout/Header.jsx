import React from "react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../../assets/icon/home.svg";
import image2 from "../../assets/icon/save.svg";
// import image3 from '../../assets/icon/profile.jpeg'
import image4 from "../../assets/icon/explore.svg";
import image5 from "../../assets/icon/plus.svg";
import { logout } from "../../Redux/User/UserAction";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header style={{ height: "50px" }}>
      <div className="header_container" style={{ backgroundColor: "#2e3836" }}>
        <div className="branding">
          <Link to="/home">
            <h1
              className="brand-logo-header"
              style={{ color: "#F27D92", marginTop: "1rem" }}
            >
              &nbsp;CUScholars
            </h1>
          </Link>
        </div>
        {/* <div className='searchbar'>
            <input className='search' placeholder='Search' type="text" />
        </div> */}
        <div className="iconbar" style={{ marginRight: "10px" }}>
          <Link to="/home">
            <img className="icon_1" src={image1} alt="" />
          </Link>
          <Link to="/explore">
            <img className="icon_1" src={image4} alt="" />
          </Link>
          <Link to="/createPosts">
            <img className="icon_1" src={image5} alt="" />
          </Link>
          {/* <Link to="/savePosts"><img className='icon_1'  src={image2} alt=""/></Link> */}
          {/* <Link to="/profile"><img className='icon_11' style={{color:"#F27D92"}}  src={image3}  alt=""/></Link> */}

          <button
            className="logoutbtn"
            style={{
              marginLeft: "15px",
              marginRight: "10px",
              backgroundColor: "pink",
              width: "80px",
              borderRadius: "7px",
            }}
            type="submit"
            onClick={async () => {
              await dispatch(logout());
              await navigate("/");
              await window.location.reload(true);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
