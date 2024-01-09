const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { validate } = require("./composables/validator");
const upload = require("./utils/multer");

const app = express();

app.use(cors());

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

const authRoute = require("./routes/auth");
const newsRoute = require("./routes/news");
const areaRegisterRoute = require("./routes/area.register");
const jobVacancyRoute = require("./routes/job.vacancy");
const applicationFormRoute = require("./routes/application.form");
const addressRoute = require("./routes/address");
const heroOneRoute = require("./routes/home/hero/heroOne");
const heroTwoRoute = require("./routes/home/hero/heroTwo");
const heroThreeRoute = require("./routes/home/hero/heroThree");
const heroFourRoute = require("./routes/home/hero/heroFour");
const heroFiveRoute = require("./routes/home/hero/heroFive");
const deepPenetrationRoute = require("./routes/home/deep-penetration/deep-penetration-img");
const whoWeAreRoute = require("./routes/home/who-we-are/who-we-are");
const partnersRoute = require("./routes/home/partners/partners");
const emailRoute = require("./routes/footer/email");
const phoneRoute = require("./routes/footer/phone");
const aboutHero = require("./routes/about.us/hero");
const rollout = require("./routes/about.us/rollout");
const rolloutText = require("./routes/about.us/rollout.text");
const ourInfrastructure = require("./routes/about.us/our.infrastructure");
const ourInfrastructureText = require("./routes/about.us/our.infrastructure.text");
const ourPlatform = require("./routes/about.us/our.platform");
const ourPlatformText = require("./routes/about.us/our.platform.text");
const ourService = require("./routes/about.us/our.service");
const ourServiceText = require("./routes/about.us/our.service.text");
const testRoute = require("./routes/test");

app.use("/api/v1/auth", validate, authRoute);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/area-register", areaRegisterRoute);
app.use("/api/v1/jobs", jobVacancyRoute);
app.use("/api/v1/application", applicationFormRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/home/one", upload.single("heroOneImg"), heroOneRoute);
app.use("/api/v1/home/two", upload.single("heroTwoImg"), heroTwoRoute);
app.use("/api/v1/home/three", upload.single("heroThreeImg"), heroThreeRoute);
app.use("/api/v1/home/four", upload.single("heroFourImg"), heroFourRoute);
app.use("/api/v1/home/five", upload.single("heroFiveImg"), heroFiveRoute);
app.use(
  "/api/v1/home/deep-penetration",
  upload.single("deepPenetrationImg"),
  deepPenetrationRoute
);
app.use("/api/v1/home/who-we-are", upload.single("whoWeAre"), whoWeAreRoute);
app.use("/api/v1/home/partners", upload.single("partner"), partnersRoute);
app.use("/api/v1/footer/email", emailRoute);
app.use("/api/v1/footer/phone", phoneRoute);
app.use("/api/v1/about-us/hero", upload.single("heroImg"), aboutHero);
app.use("/api/v1/about-us/rollout", upload.single("rolloutImg"), rollout);
app.use("/api/v1/about-us/rollout-text", rolloutText);
app.use(
  "/api/v1/about-us/our-infrastructure",
  upload.single("ourInfrastructureImg"),
  ourInfrastructure
);
app.use("/api/v1/about-us/our-infrastructure-text", ourInfrastructureText);
app.use(
  "/api/v1/about-us/our-platform",
  upload.single("ourPlatformImg"),
  ourPlatform
);
app.use("/api/v1/about-us/our-platform-text", ourPlatformText);
app.use(
  "/api/v1/about-us/our-service",
  upload.single("ourServiceImg"),
  ourService
);
app.use("/api/v1/about-us/our-service-text", ourServiceText);
app.use("/api/v1/test", testRoute);

module.exports = app;
