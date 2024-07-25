export const socketMock = {
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

export const connectSocketMock = jest.fn(() => socketMock);
export const disconnectSocketMock = jest.fn();
