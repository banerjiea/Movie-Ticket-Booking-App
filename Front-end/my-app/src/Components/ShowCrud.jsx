import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
const ShowCrud = () => {
  const [show, setShow] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadShows();
  });

  const redirect = () => {
    navigate("/showlist/insert");
  };

  const loadShows = async () => {
    try {
      const result = await axios.get("http://localhost:4000/showapi/showall");
      setShow(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (_id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this show!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:4000/showapi/delete/${_id}`);
          swal("The show has been deleted!", {
            icon: "success",
          });
          loadShows(); // Refresh the list after successful deletion
        } catch (error) {
          console.log(error);
          swal("Oops! Something went wrong.", {
            icon: "error",
          });
        }
      } else {
        swal("The show is safe!");
      }
    });
  };

  return (
    <div className="container mt-3">
      <button className="btn btn-info" onClick={redirect}>
        Add Show
      </button>
      {show.length === 0 ? (
        <div className="mt-4">No shows available!!</div>
      ) : (
        <div>
          <h3>List of Shows</h3>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Movie Name</th>
                <th scope="col">Type</th>
                <th scope="col">Votes/Rating</th>
                <th scope="col">Duration</th>
                <th scope="col">Cast</th>
                <th scope="col">Movie Description</th>
                <th scope="col">Poster</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {show.map((shows, index) => (
                <tr>
                  <th scope="row"> {index + 1}</th>
                  <td>{shows.showname}</td>
                  <td>{shows.showtype}</td>
                  <td>
                    {shows.showvotes} / {shows.showrating}
                  </td>
                  <td>{shows.showduration}</td>
                  <td>{shows.showcast}</td>
                  <td>{shows.showdescr}</td>
                  <td>
                    <img src={shows.profileImg} height="150rem" alt="dp" />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger mb-3"
                      onClick={() => deleteUser(shows._id)}
                    >
                      Delete
                    </button>
                    <Link
                      className="btn btn-outline-success"
                      to={`/showlist/${shows._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowCrud;
