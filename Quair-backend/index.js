const express = require("express");
// const emailjs = require("'emailjs-com'");
const app = express();
var cors = require("cors");

app.use(cors);
var cron = require("node-cron");
const axios = require("axios");
// import http from "http";
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

const whatIsAirQuality = (aqi) => {
  if (aqi <= 50) {
    return "good";
  } else if (aqi <= 100) {
    return "moderate";
  } else if (aqi <= 150) {
    return "unhealthyfs";
  } else if (aqi <= 200) {
    return "unhealth";
  } else if (aqi <= 300) {
    return "veryunhealthy";
  } else if (aqi > 300) {
    return "hazardous";
  }
};

const indexThresholds = {
  good: { banner: "It's a great day to be active outside!", color: "#088b00" },
  moderate: {
    banner: "Unusually sensitive groups should be concerned!",
    color: "#f4bb03",
  },
  unhealthyfs: {
    banner:
      "Sensitive groups such as Health/Lung Patients should be concerned!",
  },
  unhealthy: { banner: "Everyone should be concerned", color: "#ff0000" },
  veryunhealthy: { banner: "Everyone should be concerned", color: "#99004c" },
  hazardous: { banner: "Everyone should be concerned", color: "#7e0023" },
};

// app.get("/aqi", async (req, res) => {
//   //   console.log(req);
//   await axios(
//     "https://api.waqi.info/feed/here/?token=c8ba0ea4a4e8b4b86c848063f1fdc66b88e07ae8"
//   ).then((response) => {
//     res.send(response.data);
//   });
//   //   console.log(data);
// });

const inbox1 = {
  id: "34c3aae5-79bd-4ac0-939e-e42eea4d79cc",
  emailAddress: "34c3aae5-79bd-4ac0-939e-e42eea4d79cc@mailslurp.com",
};

const API_KEY =
  "ac9449bb1c64cc87a5495994d1d6c1b4f6892231d243365746b52f964cd68f50";

axios(
  "https://api.waqi.info/feed/here/?token=c8ba0ea4a4e8b4b86c848063f1fdc66b88e07ae8"
).then(async (response) => {
  // console.log(response.data);

  let data = response.data.data;

  if (data.aqi > 50) {
    await axios({
      method: "POST",
      url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
      data: {
        senderId: inbox1.id,
        to: inbox1.emailAddress,
        subject: "Warning, Air Quality Low",
        body: `
        Hello Hasala,
        <br>
        The air quality in your area (${data.city.name}) is ${data.aqi}!
        <br>
        It is recommended that ${
          indexThresholds[whatIsAirQuality(data.aqi)].banner
        }
        <br><br>
        Best Regards,<br>
        Quair
        `,
      },
    });
  }
});

setInterval(async () => {
  await axios(
    "https://api.waqi.info/feed/here/?token=c8ba0ea4a4e8b4b86c848063f1fdc66b88e07ae8"
  ).then((response) => {
    if (data.aqi > 50) {
      axios({
        method: "POST",
        url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
        data: {
          senderId: inbox1.id,
          to: inbox1.emailAddress,
          subject: "Warning, Air Quality Low",
          body: `
          Hello Hasala,
          <br>
          The air quality in your area (${data.city.name}) is ${data.aqi}!
          <br>
          It is recommended that ${
            indexThresholds[whatIsAirQuality(data.aqi)].banner
          }
          <br><br>
          Best Regards,<br>
          Quair
          `,
        },
      });
    }
  });
}, 1000 * 60 * 60);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
