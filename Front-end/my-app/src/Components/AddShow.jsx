import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const AddShow = () => {
  const nameref = useRef();
  const errorname = useRef();
  const btnref = useRef();

  const [show, setShow] = useState({
    showname: "",
    showtype: "",
    showvotes: "",
    showrating: null,
    showduration: "",
    showcast: "",
    showdescr: "",
  });
  const [profileImg, setProfileImg] = useState("");
  const {
    showname,
    showtype,
    showvotes,
    showrating,
    showduration,
    showcast,
    showdescr,
  } = show;

  const navigate = useNavigate();

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const onInputChange = (e) => {
    setShow({ ...show, [e.target.name]: e.target.value });
  };

  const isvalid = () => {
    btnref.current.disabled = false;
  };
  const isinvalid = () => {
    btnref.current.disabled = true;
  };
  const validname = () => {
    if (nameref.current.value.length <= 70) {
      errorname.current.innerHTML = "";
      nameref.current.classList.remove("is-invalid");
      nameref.current.classList.add("is-valid");
      isvalid();
    } else {
      errorname.current.innerHTML = "Description should not be too large";
      nameref.current.classList.add("is-invalid");
      isinvalid();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("showname", showname);
    formData.append("showtype", showtype);
    formData.append("showvotes", showvotes);
    formData.append("showrating", showrating);
    formData.append("showduration", showduration);
    formData.append("showcast", showcast);
    formData.append("showdescr", showdescr);
    axios
      .post("http://localhost:4000/showapi/showupload", formData, {})
      .then((res) => {
        swal("Show added Successfully!", "", "success");
        navigate("/showlist");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container mt-3">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Show Name"
            name="showname"
            value={showname}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Show type"
            name="showtype"
            value={showtype}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Show votes"
            name="showvotes"
            value={showvotes}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="Enter Show rating"
            name="showrating"
            value={showrating}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Show Duration"
            name="showduration"
            value={showduration}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Cast Names"
            name="showcast"
            value={showcast}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter About the show"
            name="showdescr"
            value={showdescr}
            onChange={(e) => onInputChange(e)}
            ref={nameref}
            onKeyUp={validname}
            required
          />
        </div>
        <p
          style={{
            color: "red",
            fontSize: "medium",
            fontFamily: "monospace",
          }}
          ref={errorname}
        ></p>

        <div className="form-group">
          Movie Picture:
          <input
            className="ml-3"
            type="file"
            onChange={onFileChange}
            name="profileImg"
            required
          />
        </div>
        <button className="btn btn-primary btn-block" ref={btnref}>
          Add Show
        </button>
      </form>
    </div>
  );
};

export default AddShow;
