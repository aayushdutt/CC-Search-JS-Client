/*
 Creative-Commons JS Client Library
*/

const OAuth = require("oauth").OAuth2;
const qs = require("qs");
const DEBUG = process.env.DEBUG !== undefined;

class CC {
  constructor(config = {name: "", description: "", email: ""}) {
    try {
      this.clientName = config.name;
      this.clientDescription = config.description;
      this.clientEmail = config.email;
      
      this.baseUrl = "https://api.creativecommons.engineering";

      this.oauth = new OAuth(
        this.clientId,
        this.clientSecret,
        this.baseSite
      );
    } catch (err) {
      console.log(err);
    }
  }


  searchImage(query, error, success) {
    const path = `/image/search?q=${query}`;
    const url = this.baseUrl + path;
    this.doRequest(url, error, success);
  }

  getImageDetails(identifier, error, success) {
    const path = `/image/${identifier}`;
    const url = this.baseUrl + path;
    this.doRequest(url, error, success);
  }

  resolveLink(path, error, success) {
    const path = `/link/${path}`;
    const url = this.baseUrl + path;
    this.doRequest(url, error, success);
  }

  listDetail(slug, error, success) {
    const path = `/list/${slug}`;
    const url = this.baseUrl + path;
    this.doRequest(url, error, success);
  }

  keyInfo(error, success) {
    const path = "/oauth2/key_info";
    const url = this.baseUrl + path;
    this.doRequest(url, error, success);
  }

  imageStats(error, success) {
    const path = "/statistics/image";
    const url = this.baseUrl + path;
    this.doRequest(url, error, success);
  }
  
  readWatermark(identifier, error, success) {
    const path = `/watermark/${identifier}`;
    const url = this.baseUrl + path;
    this.doRequest(url, error, success);
  }

  getCustomApiCall(url, params, error, success) {
    const path = url + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
  }

  postCustomApiCall(url, params, error, success) {
    const path = url + this.buildQS(params);
    var url = this.baseUrl + path;
    this.doPost(url, params, error, success);
  }

  doRequest(url, error, success) {
    // Fix the mismatch between OAuth's  RFC3986's and Javascript's beliefs in what is right and wrong
    // From https://github.com/ttezel/twit/blob/master/lib/oarequest.js
    url = url
      .replace(/\!/g, "%21")
      .replace(/\'/g, "%27")
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")
      .replace(/\*/g, "%2A");

    this.oauth.get(url, this.accessToken, function(err, body, response) {
      if (DEBUG) console.log("URL [%s]", url);
      if (!err && response.statusCode == 200) {
        success(body);
      } else {
        error(err, response, body);
      }
    });
  }

  doPost(url, post_body, error, success) {
    // Fix the mismatch between OAuth's  RFC3986's and Javascript's beliefs in what is right and wrong
    // From https://github.com/ttezel/twit/blob/master/lib/oarequest.js
    url = url
      .replace(/\!/g, "%21")
      .replace(/\'/g, "%27")
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")
      .replace(/\*/g, "%2A");

    this.oauth.post(
      url,
      this.accessToken,
      this.accessTokenSecret,
      post_body,
      "application/x-www-form-urlencoded",
      function(err, body, response) {
        if (DEBUG) console.log("URL [%s]", url);
        if (!err && response.statusCode == 200) {
          success(body);
        } else {
          error(err, response, body);
        }
      }
    );
  }

  buildQS(params) {
    if (params && Object.keys(params).length > 0) {
      return `?${qs.stringify(params)}`;
    }
    return "";
  }
}

// Export CC
if (typeof exports !== "undefined") {
  module.exports = CC;
}


// // Usage Examples
// var cc = new CC({name: "test", description: "test", email: "test@test.com"})
// cc.searchImage("tech", console.log, console.log)

// cc.imageStats(console.log, console.log)