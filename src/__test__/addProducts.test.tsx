// @ts-nocheck
import "@testing-library/jest-dom";
import {
  fireEvent, render, screen, waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import Layout from "../components/layouts/SellerLayout";
import store from "../redux/store";
import AddCategory from "../components/dashboard/AddCategory";
import CustomSelect from "../components/dashboard/CustomSelect";
import TextInput from "../components/common/TextInput";
import AddProduct from "../dashboard/sellers/AddProduct";
import FileUpload from "../components/dashboard/FileUpload";
import { fetchCategories } from "../redux/reducers/categoriesSlice";
import { LogoutProvider } from "../components/dashboard/admin/LogoutContext";

beforeAll(() => {
  const mockPayload = {
    roleId: 2,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const base64Url = btoa(JSON.stringify(mockPayload));
  const mockToken = `header.${base64Url}.signature`;

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => mockToken),
      setItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
      clear: jest.fn(() => null),
    },
    writable: true,
  });
});

jest.mock("react-dropzone", () => ({
  useDropzone: jest.fn(),
}));

jest.mock("../redux/api/productsApiSlice", () => ({
  addProduct: jest.fn(),
}));

global.URL.createObjectURL = jest.fn();

describe("FileUpload component", () => {
  const onDropMock = jest.fn();
  const removeMock = jest.fn();
  const filesMock = [
    new File(["dummy content"], "example.png", { type: "image/png" }),
  ];

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
  }));

  beforeEach(() => {
    (useDropzone as jest.Mock).mockImplementation(() => ({
      getRootProps: jest.fn(() => ({ onClick: () => {} })),
      getInputProps: jest.fn(),
      isDragActive: false,
      open: jest.fn(),
    }));
  });

  it("should render the component with no files", () => {
    render(
      <LogoutProvider>
        {" "}
        {/* Wrap with LogoutProvider */}
        <FileUpload onDrop={onDropMock} remove={removeMock} files={[]} />
      </LogoutProvider>,
    );

    expect(screen.getByText("Browse Images...")).toBeInTheDocument();
    expect(screen.getByText(/Browse Images.../i)).toBeInTheDocument();
    expect(screen.getByText("Browse Images...")).toHaveClass("text-gray-500");
  });

  it("should render the component with files", () => {
    render(
      <LogoutProvider>
        {" "}
        {/* Wrap with LogoutProvider */}
        <FileUpload onDrop={onDropMock} remove={removeMock} files={filesMock} />
      </LogoutProvider>,
    );
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("should call remove when the remove button is clicked", () => {
    render(
      <LogoutProvider>
        {" "}
        {/* Wrap with LogoutProvider */}
        <FileUpload onDrop={onDropMock} remove={removeMock} files={filesMock} />
      </LogoutProvider>,
    );

    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    expect(removeMock).toHaveBeenCalledWith(filesMock[0], expect.any(Object));
  });
});

describe("test seller dashboard components", () => {
  it("should render dashboard layout", () => {
    render(
      <Provider store={store}>
        <Router>
          <LogoutProvider>
            {" "}
            {/* Wrap with LogoutProvider */}
            <Layout>
              <h1>Seller's dashboard</h1>
            </Layout>
          </LogoutProvider>
        </Router>
      </Provider>,
    );
    const sellerDashboard = screen.getByText("Seller's dashboard");
    expect(sellerDashboard).toBeInTheDocument();
  });

  it("should render AddCategory modal", () => {
    const mockSetCategoryModal = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <LogoutProvider>
            {" "}
            {/* Wrap with LogoutProvider */}
            <AddCategory setCategoryModal={mockSetCategoryModal} />
          </LogoutProvider>
        </Router>
      </Provider>,
    );
    const modalTitle = screen.getByText("New Category");
    expect(modalTitle).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();

    const imageInput = screen.getByLabelText("Image");
    expect(imageInput).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText("Description");
    expect(descriptionInput).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();

    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();
  });

  it("should render CustomSelect component", () => {
    const mockOnSelect = jest.fn();
    const options = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];
    render(
      <Provider store={store}>
        <Router>
          <LogoutProvider>
            {" "}
            {/* Wrap with LogoutProvider */}
            <CustomSelect
              options={options}
              defaultValue="Select a category"
              onSelect={mockOnSelect}
            />
          </LogoutProvider>
        </Router>
      </Provider>,
    );
    const select = screen.getByText("Select a category");
    expect(select).toBeInTheDocument();

    fireEvent.click(select);

    const categoryOption = screen.getByText("Select a category");
    expect(categoryOption).toBeDefined();

    fireEvent.click(categoryOption);
    expect(select).toHaveTextContent("Select a category");
  });

  it("should render the TextInput with label, placeholder, and no error", () => {
    const label = "Product name";
    const placeholder = "Enter product name";

    const Component = () => {
      const { register } = useForm();
      return (
        <LogoutProvider>
          {" "}
          {/* Wrap with LogoutProvider */}
          <TextInput
            label={label}
            placeholder={placeholder}
            register={register}
            name="productName"
          />
        </LogoutProvider>
      );
    };

    render(<Component />);

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();

    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).not.toBeDisabled();
  });

  it("should render the TextInput with an error message", () => {
    const label = "Product name";
    const placeholder = "Enter product name";
    const errorMessage = "This field is required";

    const Component = () => {
      const { register } = useForm();
      return (
        <LogoutProvider>
          {" "}
          {/* Wrap with LogoutProvider */}
          <TextInput
            label={label}
            placeholder={placeholder}
            register={register}
            name="productName"
            error={errorMessage}
          />
        </LogoutProvider>
      );
    };

    render(<Component />);

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("text-red-500");
  });

  it("should render AddProduct form", () => {
    render(
      <Provider store={store}>
        <Router>
          <LogoutProvider>
            {" "}
            {/* Wrap with LogoutProvider */}
            <AddProduct />
          </LogoutProvider>
        </Router>
      </Provider>,
    );
    const productInformation = screen.getByText("Product Information");
    expect(productInformation).toBeInTheDocument();

    const productName = screen.getByLabelText("Product name");
    expect(productName).toBeInTheDocument();

    const price = screen.getByLabelText("Price");
    expect(price).toBeInTheDocument();

    const stockQuantity = screen.getByLabelText("Stock quantity");
    expect(stockQuantity).toBeInTheDocument();

    const discount = screen.getByLabelText("Discount");
    expect(discount).toBeInTheDocument();

    const expiryDate = screen.getByLabelText("Expiry date");
    expect(expiryDate).toBeInTheDocument();

    const description = screen.getByPlaceholderText("Description");
    expect(description).toBeInTheDocument();

    const images = screen.getByText("Images");
    expect(images).toBeInTheDocument();

    const publishButton = screen.getByText("Publish Product");
    expect(publishButton).toBeInTheDocument();
  });

  it("should handle category selection", () => {
    render(
      <Provider store={store}>
        <Router>
          <LogoutProvider>
            {" "}
            {/* Wrap with LogoutProvider */}
            <AddProduct />
          </LogoutProvider>
        </Router>
      </Provider>,
    );

    const newButton = screen.getByText("New");
    fireEvent.click(newButton);

    const modalTitle = screen.getByText("New Category");
    expect(modalTitle).toBeInTheDocument();
  });
});

it("should display error messages for invalid inputs", async () => {
  render(
    <Provider store={store}>
      <Router>
        <LogoutProvider>
          {" "}
          {/* Wrap with LogoutProvider */}
          <AddProduct />
        </LogoutProvider>
      </Router>
    </Provider>,
  );

  fireEvent.submit(screen.getByText("Publish Product"));

  await waitFor(() => {
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });
});

it("should open and close AddCategory modal", () => {
  render(
    <Provider store={store}>
      <Router>
        <LogoutProvider>
          {" "}
          {/* Wrap with LogoutProvider */}
          <AddProduct />
        </LogoutProvider>
      </Router>
    </Provider>,
  );

  fireEvent.click(screen.getByText("New"));

  expect(screen.getByText("New Category")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Cancel"));

  expect(screen.queryByText("New Category")).not.toBeInTheDocument();
});

describe("test categories slice", () => {
  it("should handle categories initial state", () => {
    expect(store.getState().categories).toEqual({
      loading: true,
      data: [],
      error: null,
    });
  });

  it("should handle categories pending", () => {
    // @ts-ignore
    store.dispatch(fetchCategories.pending(""));
    expect(store.getState().categories).toEqual({
      loading: true,
      data: [],
      error: null,
    });
  });

  it("should handle categories fulfilled", () => {
    const mockData = { message: "success" };
    // @ts-ignore
    store.dispatch(fetchCategories.fulfilled(mockData, "", {}));
    expect(store.getState().categories).toEqual({
      loading: false,
      data: mockData,
      error: null,
    });
  });

  it("should handle categories fetch rejected", () => {
    store.dispatch(fetchCategories.rejected(null, "", {}));
    expect(store.getState().categories.error).toEqual("Rejected");
  });
});
