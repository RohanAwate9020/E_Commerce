export function fetchLoggedInUserOrders(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/orders/?user='+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

export function fetchLoggedInUser(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/user/'+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }


  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/user/"+update.id, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      resolve({ data });
    });
  }