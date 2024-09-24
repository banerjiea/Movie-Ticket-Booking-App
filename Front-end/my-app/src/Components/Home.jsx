import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import img from "../Components/photos/kalki.jpg";
import img2 from "../Components/photos/Padatik-Movie.jpg";
import img3 from "../Components/photos/avatar.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import PromotedMovieCard from "./ShowCard";

const Home = () => {
  const [shows, setShows] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/showapi/showall");
    setShows(result.data);
  };

  const filteredShows = useMemo(() => {
    if (!searchText) return shows;
    let updatedShows = shows.filter((show) =>
      show.showname.toLowerCase().includes(searchText.toLowerCase())
    );

    return updatedShows;
  }, [shows, searchText]);

  return (
    <div>
      <div className="container">
        {" "}
        <input
          className="form-control me-2 mt-4 mb-4"
          type="search"
          placeholder="Search Shows"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="Search"
          style={{ border: "2px solid skyblue" }}
        />
        <div className="container">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img3}
                height="455"
                width="1200"
                alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img2}
                height="455"
                width="1200"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3 style={{ color: "black", fontWeight: "bold" }}>
                  Watch Padatik Now
                </h3>
                <p>A Tribute to Mrinal Sen</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img}
                height="455"
                width="1200"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 style={{ marginBottom: "3rem" }}>Advance Booking open</h3>
                {/* <p> Book Here</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="bg-light">
          <div>
            <h3
              style={{
                marginTop: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "1rem",
              }}
            >
              Trending Movies
            </h3>
          </div>
          {filteredShows.length === 0 ? (
            <div className="mt-4">No Results found ...</div>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexBasis: "50%",
                marginLeft: "4.5rem",
              }}
            >
              {filteredShows.map((show) => (
                <PromotedMovieCard key={show._id} show={show} />
              ))}
            </div>
          )}
        </div>
      </div>
      <footer
        style={{
          backgroundColor: "skyblue",
          paddingBottom: "0.5rem",
        }}
      >
        <i className="bi bi-instagram mr-2"></i>
        <i className="bi bi-facebook mr-2"></i>
        <i className="bi bi-linkedin mr-2"></i>
        <i className="bi bi-twitter-x mr-2"></i>
        <i className="bi bi-youtube"></i>
        <p style={{ justifyContent: "end" }}>
          For the best view use Microsoft Edge, Google Chrome Browser |
          Copyright © 2024,Book Your Show. All right reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
