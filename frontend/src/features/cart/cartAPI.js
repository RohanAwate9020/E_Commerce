export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart' ,{
    method:"POST",
    body:JSON.stringify(item),
    headers:{
      'Content-Type': 'application/json'}
    })
    const data= await response.json()
    resolve({data})
  }
  );
}


export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?userId="+userId);
    const data = await response.json();
   
    resolve({ data });
  });
}

export function UpdateCart(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+update.id,{
    method:"PATCH",
    body:JSON.stringify(update),
    headers:{
      'Content-Type': 'application/json'}
    })
    const data= await response.json();
    resolve({data})
  }
  );
}


// export function deleteitemfromCart(ItemId) {
//   return new Promise(async (resolve) =>{
//     const response = await fetch('http://localhost:8080/cart/'+ItemId,{
//     method:"DELETE",
//     headers:{
//       'Content-Type': 'application/json'}
//     })
//     const data= await response.json();
//     resolve({data:{message:`Cart item with id ${ItemId} deleted successfully`}})
//   }
//   );
// }


export function deleteitemfromCart(ItemId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8080/cart/' + ItemId, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      resolve({ data: { id: ItemId } }); // ✅ real id sent to reducer
    } else {
      const errorText = await response.text();
      reject(new Error(errorText));
    }
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