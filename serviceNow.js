const request = require('request'),
    config = require('./config'),
    GlideRecord = require('servicenow-rest').gliderecord,
    record = new GlideRecord(config.serviceNowInstance, config.serviceNowTableName, config.serviceNowUserName, config.serviceNowPassword, config.serviceNowVersion);

//To handle the service now request
var serviceNow = {
    //To save the incident using the servicenow API
    saveIncident: function (res, userData) {
        var obj = {
            category: userData.category,
            subcategory: userData.subCategory,
            urgency: userData.urgencyType,
            contact_type: userData.contactDetails,
            short_description: userData.description
        };
        //To insert the incident details
        record.insert(obj).then(function (response) {
            console.log("Incident Id is " + response.number);
            let message = ' Your incident is noted. We will let you know after completing. Please note this Id - ' + response.number + ' for further reference ';
            return res.json({
                speech: message,
                displayText: message,
                source: 'reportIncidentBot'
            });
        }).catch(function (error) {
            console.log("Error in result " + error);
            return res.json({
                speech: error,
                displayText: error,
                source: 'reportIncidentBot'
            });
        });
    },
    //To get the incident details using the incident Id
    getIncidentDetails: function (res, incidentId) {
        try {
            console.log("Inside get incident");
            request({
                url: config.getIncidentUrl + incidentId,
                headers: { 'Authorization': 'Basic MzMyMzg6YWJjMTIz' },
                method: 'GET'
            }, (error, response) => {
                let incidentDetails = '';
                if (!error && response.statusCode == 200) {
                    let incidentJson = JSON.parse(response.body);

                    let incidentStatus = incidentJson.result[0].incident_state == '1' ? 'New' : incidentJson.result[0].incident_state == '2' ? 'In Progress' :
                        incidentJson.result[0].incident_state == '3' ? 'On Hold' : incidentJson.result[0].incident_state == '4' ? 'Resolved' :
                            incidentJson.result[0].incident_state == '5' ? 'Closed' : 'Cancelled';

                    let reasonForHold = incidentJson.result[0].incident_state == '3' ? incidentJson.result[0].hold_reason == '1' ? 'Awaiting Caller' :
                        incidentJson.result[0].hold_reason == '2' ? 'Awaiting Evidence' : incidentJson.result[0].hold_reason == '3' ? 'Awaiting Problem Resolution' : 'Awaiting Vendor' : '';

                    incidentDetails = "Please find the incident details below \n 1) Incident Id - " + incidentJson.result[0].number +
                        "\n 2) Category - " + incidentJson.result[0].category + " \n 3) Description - " + incidentJson.result[0].short_description +
                        "\n 4) Urgency - " + (incidentJson.result[0].urgency == '1' ? 'High' : incidentJson.result[0].urgency == '2' ? 'Medium' : 'Low') +
                        "\n 5) Status - " + incidentStatus + (reasonForHold != '' ? "\n 6) Reason For Hold - " + reasonForHold : '');

                    return res.json({
                        speech: incidentDetails,
                        displayText: incidentDetails,
                        source: 'reportIncidentBot'
                    });
                } else if (response.statusCode == 404) {
                    incidentDetails = 'There is no incident with the given id';
                    return res.json({
                        speech: incidentDetails,
                        displayText: incidentDetails,
                        source: 'reportIncidentBot'
                    });
                } else {
                    console.log(error);
                    incidentDetails = 'Try again later';
                    return res.json({
                        speech: incidentDetails,
                        displayText: incidentDetails,
                        source: 'reportIncidentBot'
                    });
                }
            });
        } catch (e) {
            console.log("Exception in getIncidentDetails " + e);
        }
    }
};

module.exports = serviceNow;