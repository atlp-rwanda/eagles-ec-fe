import dummyProducts from "./product";

const mockResponse = {
  products: dummyProducts,
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
