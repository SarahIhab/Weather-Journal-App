/* Global Variables */

let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = ",us&appid=1d149aa11b20169bd2315498e3326ee8";

//This was causing errors in my code so I commented it out
//const { response } = require("express");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//GET Request to fetch data from the app endpoint
const getData = async (url = "", data = {}) => {
  const getResponse = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await getResponse.json();
    return newData;
  } catch (err) {
    console.log(err);
  }
};

//POST REQUEST
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//GET Request to external API
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;
  getWeather(baseURL, zipCode, apiKey).then(function (data) {
    postData("/add", {
      temp: data.main.temp,
      date: newDate,
      userResponse: userFeelings,
    });
    updateUI();
  });
}

const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL + zipCode + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("API ERROR: ", err);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();

    const allDataLength = allData.finalData.length;

    document.getElementById("date").innerHTML =
      allData.finalData[allDataLength - 1].date;

    document.getElementById("temp").innerHTML =
      allData.finalData[allDataLength - 1].temp;

    document.getElementById("content").innerHTML =
      allData.finalData[allDataLength - 1].userResponse;
  } catch (err) {
    console.log(err);
  }
};
