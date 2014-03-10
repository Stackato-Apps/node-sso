var express = require('express'),
    app = express();

app.get('/', function (req, res) {

	// Read the VCAP_APPLICATION environment variable that's available to all Stackato applications
    var app_json = process.env.VCAP_APPLICATION,

    // Parse it to JSON so we can read its properties
        app_info = JSON.parse(app_json);

	// Applications are told if they're running with SSO enabled
    if (app_info.sso_enabled) {

    	// Applications that have SSO enabled are sent the following HTTP headers on every request so they can identify the user
        res.send({
            "Status": 'SSO Enabled',
            "User ID": req.headers['x-authenticated-user-id'],
            "Username": req.headers['x-authenticated-user-username'],
            "User Email": req.headers['x-authenticated-user-email']});
    } else {
        res.send({"Status": 'SSO Disabled'});
    }
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);