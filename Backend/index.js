const express = require("express");
const app = express();
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {
  isAuth,
  sanitizeUser,
  cookieExtractor,
} = require("./services/common.js");
const productsRouter = require("./routes/Products.js");
const BrandsRouter = require("./routes/Brands.js");
const categoryRouter = require("./routes/Category.js");
const userRouter = require("./routes/User.js");
const authRouter = require("./routes/Auth.js");
const cartRouter = require("./routes/Cart.js");
const orderRouter = require("./routes/Order.js");
const adminRouter = require("./routes/Admin.js");

const SECRET_KEY = "SECRET_KEY";

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY; // Replace with your secret key

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("build"));
app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.initialize()); // ✅ Required for JWT auth

app.use(passport.authenticate("session"));

// Use this config to expose custom headers like X-Total-Count
const cors = require("cors");
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    origin: "http://localhost:5173", // your frontend dev origin
    credentials: true,
  })
);

app.use("/products", isAuth(), productsRouter.router);
app.use("/brands", isAuth(), BrandsRouter.router);
app.use("/category", isAuth(), categoryRouter.router);
app.use("/user", isAuth(), userRouter.router);
app.use("/auth", authRouter.router);
app.use("/cart", isAuth(), cartRouter.router);
app.use("/orders", isAuth(), orderRouter.router);
app.use("/admin", isAuth(), adminRouter.router);

const User = require("./model/User.js").User;

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
       return done(null, false, { message: "invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Password does not match" });
          }
          // const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY);

          done(null, { token }, { message: "Login successful" });
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id); // ✅ correct method
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  // console.log("Serializing user:", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

require("dotenv").config();
const connectionString = process.env.DB_ConnectionString;
connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
async function connectDB() {
  await mongoose.connect(`${connectionString}`);
}

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
