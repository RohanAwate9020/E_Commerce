export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products",
      {credentials: 'include'}
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllProductsAdmin() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/admin/products",
      {credentials: 'include'}
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + product.id,
      {
        method: "PATCH",
        credentials: 'include',
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByID(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id,
      {credentials: 'include'}
    );
    const data = await response.json();
console.log("Fetched product by ID:", data);
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination, productName) {
  let querystring = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      querystring += `${key}=${lastCategoryValue}&`;
      // categoryValues.forEach((value) => {
      //   querystring += `${key}=${value}&`;
      // });
    }
  }
  for (let key in sort) {
    querystring += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    querystring += `${key}=${pagination[key]}&`;
  }
  if (productName) {
    querystring += `productName=${productName}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + querystring,
      {credentials: 'include'}
    );
    // console.log("http://localhost:8080/products?" + querystring);
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count") ;
    resolve({ data: { product: data, totalItems: +totalItems } });
  });
}

export function fetchProductsByFiltersAdmin(filter, sort, pagination,productName) {

  let querystring = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      querystring += `${key}=${lastCategoryValue}&`;
      // categoryValues.forEach((value) => {
      //   querystring += `${key}=${value}&`;
      // });
    }
  }
  for (let key in sort) {
    querystring += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    querystring += `${key}=${pagination[key]}&`;
  }
  if (productName) {
    querystring += `productName=${productName}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/admin/products?" + querystring,
      {credentials: 'include',}
    );
    // console.log("http://localhost:8080/products?" + querystring);
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count") ;
    resolve({ data: { product: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/category",
      {credentials: 'include'}
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands",
      {credentials: 'include'}
    );
    const data = await response.json();
    resolve({ data });
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
