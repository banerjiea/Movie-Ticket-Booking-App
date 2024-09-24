import React from "react";
import { Link } from "react-router-dom";

// ShowCard component that will be wrapped by the HOC
const ShowCard = ({ show }) => {
  return (
    <div
      className="card"
      style={{
        width: "15rem",
        borderRadius: "20px",
        margin: "20px",
        cursor: "pointer",
      }}
    >
      <img
        height="300rem"
        src={show.profileImg}
        className="card-img-top"
        alt={show.showname}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontFamily: "inherit" }}>
          {show.showname}
        </h5>
        <p className="card-text">{show.showtype}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          {show.showrating}⭐ {show.showvotes} Votes
        </li>
      </ul>
      <div className="card-body">
        <Link
          to={`/show/${show._id}`}
          className="card-link btn btn-outline-info"
          style={{ textDecoration: "none" }}
        >
          Book
        </Link>
      </div>
    </div>
  );
};

// Higher Order Component that adds a "Promoted" label
const withPromotedLabel = (ShowCard) => {
  return (props) => {
    const { showrating } = props.show;
    return (
      <div style={{ position: "relative" }}>
        {showrating > 8.5 && (
          <span
            style={{
              position: "absolute",
              top: "10px", // Added top position to adjust the label
              right: "10px",
              backgroundColor: "red",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontWeight: "bold",
              zIndex: 10, // Ensure the label appears on top
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Optional for better visibility
            }}
          >
            Promoted
          </span>
        )}
        <ShowCard {...props} />
      </div>
    );
  };
};

// Wrap ShowCard with the withPromotedLabel HOC
const PromotedMovieCard = withPromotedLabel(ShowCard);

export default PromotedMovieCard;
