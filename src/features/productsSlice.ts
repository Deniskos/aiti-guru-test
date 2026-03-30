import { API_BASE_URL } from '@/shared/api/config';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Product {
        id: number;
	title: string;
	category: string;
	price: number;
	rating: number;
	brand: string;
	sku: string;
	thumbnail: string;
}

export interface FeatchProduct {
        products: Product[],
        total: number
}

interface ProductsState {
        items: Product[];
        loading: boolean;
        error: string | null;

        page: number;
        limit: number;
        total: number; 

        sortBy:  'price' | 'rating';
        order: 'asc' | 'desc';

        searchMode: boolean;
}

const initialState: ProductsState = {
        items: [],
        loading: false,
        error: null,

        page: 1,
        limit: 5,
        total: 0,

        sortBy: 'rating',   // сортировка по умолчанию
        order: 'asc',

        searchMode: false,
};

// Асинхронный thunk для загрузки товаров
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (searchString: string | undefined = undefined, { getState }) => {
    const state = getState() as { products: ProductsState };
    const {page, limit, sortBy, order, searchMode } = state.products;

    const skip = (page - 1) * limit;

    let response;
    if (searchMode) {
        response = `${API_BASE_URL}/products/search?limit=${limit}&skip=${skip}&q=${searchString}&sortBy=${sortBy}&order=${order}&select=id,title,category,price,rating,brand,sku,thumbnail` 
    } else {
        response =  `${API_BASE_URL}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&select=id,title,category,price,rating,brand,sku,thumbnail`;
    }
    const res = await fetch(response);

    const data = await res.json();

    return {
      products: data.products as Product[],
      total: data.total,
    };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
        setPage: (state, action: PayloadAction<number>) => {
                state.page = action.payload;
        },
        setSearchMode: (state, action: PayloadAction<boolean>) => {
                state.searchMode = action.payload;
        },
        setSortBy: (state, action: PayloadAction<'price' | 'rating'>) => {
                state.sortBy = action.payload;
      },
      refreshTable: (state) => {
                state.page = 1;
                 state.sortBy = 'rating';
                 state.order = 'asc';
                 state.searchMode = false;
      },
        toggleOrder: (state) => {
        state.order = state.order === 'asc' ? 'desc' : 'asc';
        },        
       addProduct: (state, action: PayloadAction<Product>) => {
                state.items.unshift(action.payload);

                // если превышаем limit — удаляем последний элемент
                if (state.items.length > state.limit) {
                state.items.pop();
                }

                state.total += 1; 
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<FeatchProduct>) => {
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      })
  },
});

export default productsSlice.reducer;
export const { setPage, setSearchMode, setSortBy, toggleOrder, refreshTable, addProduct } = productsSlice.actions;
