import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../Redux/Profile/ProfileAction";
import { getUserfromLocalStorage } from "../../Utils/Utils";
import { CloseOutlined } from "@ant-design/icons";

export default function ShowEditModal({ showEditmodal, setEditModal }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const currentUser = getUserfromLocalStorage;

  const editProfile = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    await dispatch(updateUserProfile(userData));

    //await setName('')
    await setPassword("");
    //await setEmail('')
    await setEditModal(false);
    await window.location.reload(true);
  };

  return (
    <Modal
      isOpen={showEditmodal}
      ariaHideApp={false}
      contentLabel="Edit Profile"
      className="EditModal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds dark overlay for better focus
        },
        content: {
          // padding: '0', // Remove padding inside modal
          // width: '400px', // Customize modal width
          // margin: 'auto', // Center modal on screen
          borderRadius: "8px",
        },
      }}
    >
      <div className="col-12 profileForm">
        <form className="w-100" onSubmit={editProfile}>
          <h2
            style={{
              color: "#9d03fc",
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "700",
              fontFamily: "'Roboto', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            Edit Profile
          </h2>

          <div className="input-group">
            <span className="input-group-addon">
              <i className="icofont icofont-email"></i>
            </span>
            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
              autoComplete="off"
              value={email ? email : currentUser && currentUser.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="icofont icofont-name"></i>
            </span>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              autoComplete="off"
              value={name ? name : currentUser && currentUser.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* <div className="input-group">
            <span className="input-group-addon">
              <i className="icofont icofont-password"></i>
            </span>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              required
              autoComplete="off"
              // onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <br />
          <div className="m-t-20">
            <button
              className="btn btn-secondary btn-md btn-block m-b-10 signupbtn"
              type="submit"
              style={{ backgroundColor: "#007a99" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* <button
        className="btn btn-primary"
        style={{ marginTop: "5px", marginLeft: "85%", backgroundColor: "grey" }}
        onClick={() => setEditModal(false)}
      >
        Close
      </button> */}
      <button
        className="btn btn-primary"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setEditModal(false)}
      >
        <CloseOutlined style={{ fontSize: "20px", color: "black" }} />
      </button>
    </Modal>
  );
}
