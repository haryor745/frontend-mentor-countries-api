import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style.css";
const url = "https://restcountries.eu/rest/v2/all";
function App() {
  return <Home />;
}
const Home = () => {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataDef, setDataDef] = useState([]);
  const [down, setDown] = useState(false);
  const [search, setSearch] = useState("");
  const [drop, setDrop] = useState([]);
  const [dropName, setDropName] = useState("Filter By Region");
  const getCountries = async () => {
    const response = await fetch(url);
    const final = await response.json();
    setData(final);
    setDataDef(final);
    setDrop(final);
    setLoading(false);
  };
  const sort = [...new Set(drop.map((item) => item.region))];
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    const filtered = dataDef.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
    setData(filtered);
  }, [search]);
  const moon = dark ? <i class="fas fa-moon"></i> : <i class="far fa-moon"></i>;
  if (loading) {
    return <h1>Loading..</h1>;
  }
  return (
    <div className="container">
      <div className="header">
        <div className="header-info">
          <h1>Where in the world?</h1>
          <h3>
            {moon}
            {dark ? "Light" : "Dark"} Mode
          </h3>
        </div>
      </div>
      <div className="filter">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search for a country..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="dropdown">
          <div
            className={`trash ${dropName === "Filter By Region" && `dead`}`}
            onClick={() => {
              setDropName("Filter By Region");
              setData(drop);
              setDown(false);
            }}
          >
            <i class="far fa-trash-alt"></i>
          </div>
          <div
            className="shown"
            onClick={() => {
              setDown(!down);
            }}
          >
            <p>{dropName}</p>
            <i className="fas fa-chevron-down"></i>
          </div>
          <div className={`hidden ${down && "true"} `}>
            {sort.map((item, index) => {
              return (
                <button
                  className="filter-btn"
                  key={index}
                  onClick={() => {
                    setData(drop.filter((e) => e.region === item));
                    setDropName(item);
                    setDown(false);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="countries">
        {data.map((item) => {
          return (
            <div className="card" key={item.name}>
              <img src={item.flag} alt="flag" />
              <div className="text">
                <h4>{item.name}</h4>
                <h5>
                  <span className="bold">Population: </span>
                  <span className="light">{item.population}</span>
                </h5>
                <h5>
                  <span className="bold">Region: </span>
                  <span className="light">{item.region}</span>
                </h5>
                <h5>
                  <span className="bold">Capital: </span>
                  <span className="light">{item.capital}</span>
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const SingleCountry = () => {};
export default App;
