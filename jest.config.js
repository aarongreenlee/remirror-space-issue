module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/meta/empty-string.js",
    "^(lib|model|views)$": "<rootDir>/src/$1",
    "^(lib|model|views)/(.*)": "<rootDir>/src/$1/$2",
    "/compute\\.js\\?build-time$": "<rootDir>/src/views/SoftwareCredits/stub.js"
  }
};
