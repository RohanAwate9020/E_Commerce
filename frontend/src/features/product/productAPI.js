export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/products') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
export function fetchProductsByFilters(filter) {
  let querystring="";
  for (let key in filter) {
    querystring += `${key}=${filter[key]}&`
  }
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/products?'+querystring) 
      const data = await response.json()
      resolve({data})
      console.log(filter)
    }
    );
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