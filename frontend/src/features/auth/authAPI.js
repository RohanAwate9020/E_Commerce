export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// export function loginUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginInfo),
//       });
//       console.log("Response status:", response);
//       if (response.ok) {
//         const Data = await response.json();
//         resolve({ Data });
//       } else {
//         const error = await response.text();
//         reject(error);
//       }
//     } catch (err) {
//       reject({ err });
//     }
//   });
// }
export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Include credentials for session management
        body: JSON.stringify(loginInfo),
      });

      if (response.ok) {
        const data = await response.json();
        resolve(data); // ✅ Directly resolve with data
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (err) {
      reject(err); // ❌ No need to wrap in { err }
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/check", {
        method: "get",
        credentials: "include",
      });

      if (response.ok) {
        const Data = await response.json();
        resolve({ Data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (err) {
      reject({ err });
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    resolve({ message: "User signed out." });
  });
}

// let addJob = () => {
//   axios
//     .post(`${process.env.REACT_APP_CRUD_SINGLE_JOB_URL}`, newJob, config)
//     .then(() => {
//       alert('Job Update is created')
//       navigate('/jobs')
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// addJob();
