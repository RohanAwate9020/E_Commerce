import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductsByFilters, fetchBrands,fetchCategories,fetchProductsByID, createProduct, updateProduct, fetchAllProductsAdmin, fetchProductsByFiltersAdmin } from './productAPI';


const initialState = {
  products: [],
  productsAdmin: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};

export const fetchProductsByIDAsync = createAsyncThunk(
  'product/fetchProductsByID',
  async (id) => {
    console.log("Fetching product by ID:", id);
    const response = await fetchProductsByID(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product) => {
    const response = await updateProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAllProductsAdminAsync = createAsyncThunk(
  'product/fetchAllProductsAdmin',
  async () => {
    const response = await fetchAllProductsAdmin();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination,productName}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination,productName);
    // The value we return becomes the `fulfilled` action payload
    // console.log(filter)
    // console.log(response.data)
    return response.data;
  }
);
export const fetchProductsByFiltersAdminAsync = createAsyncThunk(
  'product/fetchProductsByFiltersAdmin',
  async ({filter,sort,pagination,productName}) => {
    const response = await fetchProductsByFiltersAdmin(filter,sort,pagination,productName);
    // The value we return becomes the `fulfilled` action payload
    // console.log(filter)
    // console.log(response.data)
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct =null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAdminAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAdminAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productsAdmin = action.payload;
      })

      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.product;
        state.totalItems = action.payload.totalItems;

      })
      .addCase(fetchProductsByFiltersAdminAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAdminAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productsAdmin = action.payload.product;
        state.totalItems = action.payload.totalItems;

      })

      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })

      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductsByIDAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByIDAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
      
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllProductsAdmin = (state) => state.product.productsAdmin;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;