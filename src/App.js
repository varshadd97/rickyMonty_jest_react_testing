/** @format */

import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchCharacter();
    fetchEpisode();
  }, []);

  useEffect(() => {
    fetchCharacter();
    fetchEpisode();
  }, [currentPage]);

  const fetchCharacter = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${currentPage}`
      );
      const json = await response.json();
      const arrayManager = Object.values(json);
      setUsers(arrayManager);
    } catch (error) {
      setError("Error Fetchning users");
    }
  };

  const fetchEpisode = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${currentPage}`
      );
      const json = await response.json();
      const arrayManager = Object.values(json);
      setEpisodes(arrayManager);
    } catch (error) {
      setError("Error Fetchning episode");
    }
  };

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="mx-auto mt-3" style={{ width: "200px" }}>
        <input
          type="text"
          placeholder="Search Charater"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-1"
        />
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="grid-container container ">
        {error && <div> {error}</div>}

        {users[1]
          ?.slice(0, 6)
          ?.filter((val) => {
            if (val === "") {
              return val;
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          .map((user) => {
            return (
              <li className="card" key={user.id}>
                <div className="d-flex justify-content-start bg-secondary bg-gradient text-white check">
                  <div>
                    <img
                      src={user.image}
                      alt="pic"
                      width={200}
                      height="auto"
                      style={{ borderRadius: "10px 0" }}
                      priority={true}
                    />
                  </div>
                  <div className="ps-3 pt-3 ">
                    <h3>{user.name}</h3>
                    <div>
                      <span
                        style={{
                          backgroundColor:
                            user?.status === "Alive"
                              ? "green"
                              : user?.status === "Dead"
                                ? "red"
                                : "lightGrey",
                          height: "15",
                          width: "15",
                          borderRadius: "25px",
                          color:
                            user?.status === "Alive"
                              ? "green"
                              : user?.status === "Dead"
                                ? "red"
                                : "lightGrey",
                          marginRight: "5px",
                        }}
                      >
                        00
                      </span>
                      status : {user?.status}
                    </div>
                    <div className="mt-2 text">Last known location : </div>
                    <div>{user?.location?.name}</div>
                    <div className="mt-2 text">First see in : </div>
                    <div>
                      {episodes &&
                        episodes[1]?.slice(0, 1)?.map((episode) => {
                          return <span key={episode.id}>{episode?.name}</span>;
                        })}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </div>
      <div className="mx-auto mt-4" style={{ width: "200px" }}>
        <button onClick={handleClickPrevious} className="m-4 bg-light p-2">
          Previous
        </button>

        <button onClick={handleClickNext} className="bg-light p-2">
          next
        </button>
      </div>
    </>
  );
}

export default App;
