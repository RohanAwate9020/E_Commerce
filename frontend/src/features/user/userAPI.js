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