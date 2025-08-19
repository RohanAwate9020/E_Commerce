export function fetchLoggedInUserOrders(userId) {
  console.log("User ID", userId);
    return new Promise(async (resolve) =>{
      console.log("Fetching orders for user:", userId);
      const response = await fetch('http://localhost:8080/orders/?user='+userId,{
        credentials: 'include', // ✅ required to send cookies
      }) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user/own', {
      credentials: 'include', // ✅ required to send cookies
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function sendMailSuperAdminTOUser({ userEmail, subject, message }) {
  console.log("Sending mail to user:", userEmail, subject, message);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/user/email", {
        method: "POST", // ✅ specify method
        credentials: "include", // ✅ required if sending cookies
        headers: {
          "Content-Type": "application/json", // ✅ must tell backend it’s JSON
        },
        body: JSON.stringify({ userEmail, subject, message }), // ✅ stringify object
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


export function fetchallUsers({sort, pagination, userName}) {
  let queryString = "";
  
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
  queryString += `${key}=${sort[key]}&`;
}
if (userName) {
    queryString += `userName=${userName}&`;
  }
  console.log("Query String:", queryString);
  return new Promise(async (resolve) => {
    console.log("Fetching all users");
    const response = await fetch('http://localhost:8080/user/users?'+queryString, {
      credentials: 'include', // ✅ required to send cookies
    });
    const data = await response.json();
    const totalUsers =await response.headers.get("X-Total-Count") ;
    resolve({ data: { users: data, totalUsers: +totalUsers } });
  });
}



  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/user/update", {
        method: "PATCH",
        credentials: "include", // ✅ this sends the jwt cookie
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Update user response:", data);
      resolve({ data });
    });
  }