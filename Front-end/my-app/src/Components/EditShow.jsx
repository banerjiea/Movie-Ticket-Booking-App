/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const EditShow = ({ setIsAdmin }) => {
  const nameref = useRef();
  const errorname = useRef();
  const btnref = useRef();
  let navigate = useNavigate();
  const { _id } = useParams();
  const [show, setShow] = useState({
    showname: "",

    showtype: "",
    showvotes: "",
    showrating: null,
    showduration: "",
    showcast: "",
    showdescr: "",
  });
  const {
    showname,
    showtype,
    showvotes,
    showrating,
    showduration,
    showcast,
    showdescr,
  } = show;

  const onInputChange = (e) => {
    setShow({ ...show, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadShow();
  }, []);
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:4000/showapi/update/${_id}`, show);
      setIsAdmin(true);
      navigate("/");
      swal("Updated Successfully", "", "success");
    } catch (err) {
      console.log(err);
    }
  };
  const loadShow = async () => {
    const result = await axios.get(
      `http://localhost:4000/showapi/allinfo/${_id}`
    );
    setShow(result.data);
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

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">Edit Details</h2>
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
            placeholder="Enter Show Type"
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
            placeholder="Enter Votes Count"
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
            placeholder="Enter Rating"
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
            placeholder="Enter Duration"
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
            placeholder="Enter Description"
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

        <button className="btn btn-primary btn-block" ref={btnref}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditShow;
