require("dotenv").config();
const Handler = require("../handler");
let registerInsurer = () => {
  let requestData = {
    name: "Bank1",
    email: "bank1@gmail.com",
    created_at: new Date().toISOString(),
    organization_type: "Bank"
  };
  let handler = new Handler("admin");
  handler
    .init()
    .then(function() {
      return handler.addOrganization(requestData);
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
};

registerInsurer();
