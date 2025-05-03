export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders' ,{
    method:"POST",
    body:JSON.stringify(order),
    headers:{
      'Content-Type': 'application/json'}
    })
    const data= await response.json()
    resolve({data})
  }
  );
}


export function updateOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders/'+order.id ,{
    method:"PATCH",
    body:JSON.stringify(order),
    headers:{
      'Content-Type': 'application/json'}
    })
    const data= await response.json()
    resolve({data})
  }
  );
}

export function fetchAllOrders({pagination}) {
  let querystring = "";
  for (let key in pagination) {
    querystring += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/orders?" + querystring
    );
    // console.log("http://localhost:8080/products?" + querystring);
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count") || 95;
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
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