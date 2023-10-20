import { useEffect, useState } from 'react'
import './App.css'
import axios from "./utilities/Axios"
// import axios from "axios"
import logo from "./assets/logo.png"

const whatIsAirQuality = (aqi) => {
  if (aqi <= 50) {
    return "good"
  } else if (aqi <= 100) {
    return "moderate"
  } else if (aqi <= 150) {
    return "unhealthyfs"
  } else if (aqi <= 200) {
    return "unhealth"
  } else if (aqi <= 300) {
    return "veryunhealthy"
  } else if (aqi > 300) {
    return "hazardous"
  }
}

const indexThresholds = {
  good: { banner: "It's a great day to be active outside!", color: "#088b00" },
  moderate: { banner: "Unusually sensitive groups should be concerned!", color: "#f4bb03" },
  unhealthyfs: { banner: "Sensitive groups such as Health/Lung Patients should be concerned!", color: "#ff7e00" },
  unhealthy: { banner: "Everyone should be concerned", color: "#ff0000" },
  veryunhealthy: { banner: "Everyone should be concerned", color: "#99004c" },
  hazardous: { banner: "Everyone should be concerned", color: "#7e0023" },
}

function App() {

  const [airQualityInfo, setAirQualityInfo] = useState({})


  // const getData = async () => {
  //   console.log("test")
  //   await axios({
  //     method: 'get',
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  //     },
  //     url: 'http://localhost:5000/aqi',
  //   })
  //     .then(function (response) {
  //       console.log(response.data)
  //     });
  // }


  useEffect(() => {
    axios.get().then((response) => {
      console.log(response)

      setAirQualityInfo(response.data.data)

    })
    setInterval(() => {
      axios.get().then((response) => {
        console.log(response)

        setAirQualityInfo(response.data.data)

      })
    }, 1000 * 60 * 60)

  }, [])

  // useEffect(() => {
  //   if (airQualityInfo.aqi) {
  //     console.log(indexThresholds[whatIsAirQuality(airQualityInfo.aqi)].color)
  //   }
  // }, [airQualityInfo])

  return (
    <>
      <img src={logo} alt="Logo" width="200px" />
      <h2>Quair</h2>
      <h1 style={{ color: airQualityInfo.aqi ? indexThresholds[whatIsAirQuality(airQualityInfo.aqi)].color : "#222222" }}>{airQualityInfo.aqi ? airQualityInfo.aqi : null}</h1>
      <h5><ion-icon name="location"></ion-icon> {airQualityInfo.city ? airQualityInfo.city.name : null}</h5>
      <div className="banner" style={{ backgroundColor: airQualityInfo.aqi ? indexThresholds[whatIsAirQuality(airQualityInfo.aqi)].color : "#222222" }}>
        <ion-icon name="information-circle"></ion-icon>
        {airQualityInfo.aqi ? indexThresholds[whatIsAirQuality(airQualityInfo.aqi)].banner : "Loading"}
      </div>
    </>
  )
}

export default App
