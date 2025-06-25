// import required core modules
const express = require("express");
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
const cors = require("cors");
require("dotenv").config();

// import custom modules and route files
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

const User = require("./model/User.js").User;

// create express app
const app = express();
const SECRET_KEY = "SECRET_KEY"; // move this to .env for production

// use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build")); // serve frontend files
app.use(cookieParser());

// configure session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));

// enable CORS for frontend access
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// passport local strategy for login
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }

      crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", (err, hashedPassword) => {
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return done(null, false, { message: "Password does not match" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY);
        return done(null, { token }, { message: "Login successful" });
      });
    } catch (err) {
      return done(err);
    }
  })
);

// passport jwt strategy for protected routes
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: SECRET_KEY,
};

passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// passport session handlers
passport.serializeUser((user, cb) => {
  process.nextTick(() => cb(null, { id: user.id, role: user.role }));
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

// mount API routes
app.use("/products", isAuth(), productsRouter.router);
app.use("/brands", isAuth(), BrandsRouter.router);
app.use("/category", isAuth(), categoryRouter.router);
app.use("/user", isAuth(), userRouter.router);
app.use("/auth", authRouter.router);
app.use("/cart", isAuth(), cartRouter.router);
app.use("/orders", isAuth(), orderRouter.router);
app.use("/admin", isAuth(), adminRouter.router);
// example email sending



// connect to MongoDB
const connectionString = process.env.DB_ConnectionString;

async function connectDB() {
  await mongoose.connect(connectionString);
}

connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
