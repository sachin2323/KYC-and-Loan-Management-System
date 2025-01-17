require("dotenv").config();
var request = require("request");
const fs = require("fs");

let registerUser = () => {
  var options = {
    method: "POST",
    url: "http://localhost:3000/api/login",
    headers: {
      "Cache-Control": "no-cache",
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
    },
    formData: {
      card: {
        value: fs.createReadStream(
          "../cards/Central Bank-AdminUser.card"
        ),
        options: {
          filename:
            "../cards/Central Bank-AdminUser.card",
          contentType: null
        }
      }
    }
  };

  return request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log("hello", body);

    let token = JSON.parse(body).token;
    options = {
      method: "POST",
      url: "http://localhost:3000/api/add-user",
      headers: {
        "Cache-Control": "no-cache",
        token,
        "Content-Type": "application/json"
      },
      body: {
        name: "Sachin Singh",
        email: "sachinsingh328@gmai.com",
        role: "Client",
        PPSId: "1234567F"
      },
      json: true
    };

    return request(options, function(error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
  });
};

registerUser();
