export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/src/__test__/__mock__/fileMock.ts",
    "\\.(css|less)$": "identity-obj-proxy",
    "~src/(.*)": "<rootDir>/src/$1",
  },
};
