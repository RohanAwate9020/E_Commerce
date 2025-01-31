export function fetchCount(amount = 1) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080') 
      const data = await response.json()
      resolve({data})
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