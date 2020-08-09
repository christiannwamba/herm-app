const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        BASE_URL: "http://localhost:3000",
        API_BASE_URL: "http://localhost:3100",
      },
    };
  }

  return {
    env: {
      BASE_URL: "https://hermapp.azurewebsites.net",
      API_BASE_URL: "https://hermapi.azurewebsites.net",
    },
  };
};