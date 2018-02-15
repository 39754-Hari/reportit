//To send the response to the google assistant
var googleAssistant = {
    //To send the text and basic card as the welcome message
    welcomeIntent: function (app) {
        app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: 'Hi welcome to Report It Bot!',
                displayText: 'Hi welcome to Report It Bot!'
            })
            .addBasicCard(app.buildBasicCard("I can help you with \n__Report a new Incident__ \n__View Incident status__ \nType exit or goodbye whenever you want to end the conversation \nPlease select any one")
                .setTitle('Report It - To solve it')
                .setImage('https://mgtvwlns.files.wordpress.com/2015/05/reportit-logo5b35d.jpg', 'Image alternate text')
                .setImageDisplay('CROPPED')
            )
            .addSuggestions(['Report Incident', 'My Incidents']));
    },
    //To send the incident category as suggestion chips
    incidentCategory: function (app) {
        app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: 'Please select the category',
                displayText: 'Please select the category'
            })
            .addSuggestions(['Hardware', 'Software'])
        );
    },
    //To send the sub category for the value for the incident category selected as Carousel
    incidentSubCategory: function (app, category) {
        if (category == 'hardware') {
            /*app.askWithCarousel('Please select the sub category',
                // Build a carousel
                app.buildCarousel()
                    // Add the first item to the carousel
                    .addItems(app.buildOptionItem('New Device',
                        ['new device', 'add device', 'setup device'])
                        .setTitle('New Device')
                        .setDescription('For requesting new device')
                        .setImage('https://cdn3.iconfinder.com/data/icons/phones-set-2/512/27-512.png', 'New Device'))
                    // Add the second item to the carousel
                    .addItems(app.buildOptionItem('Damaged Device',
                        ['damaged device', 'device damaged', 'issue with device'])
                        .setTitle('Damaged Device')
                        .setDescription('To report if the device is damaged')
                        .setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxod-I0fuatggTIxbnHFELF6y62zwXkrzthtoVAWOmOwNQuPJusw', 'Damaged Device')
                    )
                    // Add third item to the carousel
                    .addItems(app.buildOptionItem('Replace Device',
                        ['replace device', 'change device', 'exchange device'])
                        .setTitle('Replace Device')
                        .setDescription('To replace the existing device')
                        .setImage('https://cdn3.iconfinder.com/data/icons/finance-and-money-1/512/arrows_currency_exchange_direction_flat_icon-512.png', 'Replace Device')
                    )
            );*/
            app.askWithCarousel('Alright! Here are a few things you can learn. Which sounds interesting?',

                // Build a carousel

                app.buildCarousel()

                    // Add the first item to the carousel

                    .addItems(app.buildOptionItem('MATH_AND_PRIME',

                        ['math', 'math and prime', 'prime numbers', 'prime'])

                        .setTitle('Math & prime numbers')

                        .setDescription('42 is an abundant number because the sum of its ' +

                        'proper divisors 54 is greater…')

                        .setImage('https://static.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg', 'Math & prime numbers'))

                    // Add the second item to the carousel

                    .addItems(app.buildOptionItem('EGYPT',

                        ['religion', 'egpyt', 'ancient egyptian'])

                        .setTitle('Ancient Egyptian religion')

                        .setDescription('42 gods who ruled on the fate of the dead in the ' +

                        'afterworld. Throughout the under…')

                        .setImage('https://static.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg', 'Egypt')

                    )

                    // Add third item to the carousel

                    .addItems(app.buildOptionItem('RECIPES',

                        ['recipes', 'recipe', '42 recipes'])

                        .setTitle('42 recipes with 42 ingredients')

                        .setDescription('Here\'s a beautifully simple recipe that\'s full ' +

                        'of flavor! All you need is some ginger and…')

                        .setImage('https://static.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg', 'Recipe')

                    )


            ); 
        } else {
            app.askWithCarousel('Please select the sub category',
                // Build a carousel
                app.buildCarousel()
                    // Add the first item to the carousel
                    .addItems(app.buildOptionItem('Software Installation',
                        ['new software', 'add software', 'install software'])
                        .setTitle('Software Installation')
                        .setDescription('For installing new software')
                        .setImage('http://cmpg.unibe.ch/software/BayeScan/images/Download-icon.png', 'Software Installation'))
                    // Add the second item to the carousel
                    .addItems(app.buildOptionItem('Problem with installed software',
                        ['software problem', 'software issue', 'issue with software'])
                        .setTitle('Problem with installed software')
                        .setDescription('To report if any problem in the software')
                        .setImage('https://cdn0.iconfinder.com/data/icons/connection/512/icon-14.png', 'Problem with installed software')
                    )
            );
        }
    },
    //To send the urgency type for the incidents as suggestion chips
    incidentUrgencyType: function (app) {
        app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: 'Please select the urgency type or type skip to proceed',
                displayText: 'Please select the urgency type or type skip to proceed'
            })
            .addSuggestions(['High', 'Medium', 'Low'])
        );
    },
    //To send the mode of contact as quick replies
    incidentModeOfContact: function (app) {
        app.ask(app.buildRichResponse()
            .addSimpleResponse({
                speech: 'Please select the mode of contact',
                displayText: 'Please select the mode of contact'
            })
            .addSuggestions(['Phone', 'Mail'])
        );
    },
    //To send the response for default fallback intent as simple response
    helpResponse: function (app) {
        app.ask({
            speech: "Can't understand. \nPlease try asking for incident status or report the incident \nType exit or goodbye to end the conversation",
            displayText: "Can't understand.\nPlease try asking for incident status or report the incident \nType exit or goodbye to end the conversation"
        });
    },
    //To send the basic card with the incident details
    incidentDetails: function (app, incidentId) {
        app.ask(app.buildRichResponse()
            // Create a basic card and add it to the rich response
            .addSimpleResponse('Incident Recorded')
            .addBasicCard(app.buildBasicCard(' Your incident is noted. We will let you know after completing. Please note this Id - ' + incidentId + ' for further reference ')
                .setImage('', incidentId)
            )
        );
    },
    //To send the default message when error
    defaultResponse: function (app) {
        app.ask({
            speech: "Please try again later",
            displayText: "Please try again later"
        });
    },
    sendIncidentDetails: function (app, incidentResponse) {
        let incidentJson = JSON.parse(incidentResponse.body);

        let incidentStatus = incidentJson.result[0].incident_state == '1' ? 'New' : incidentJson.result[0].incident_state == '2' ? 'In Progress' :
            incidentJson.result[0].incident_state == '3' ? 'On Hold' : incidentJson.result[0].incident_state == '4' ? 'Resolved' :
                incidentJson.result[0].incident_state == '5' ? 'Closed' : 'Cancelled';

        let reasonForHold = incidentJson.result[0].incident_state == '3' ? incidentJson.result[0].hold_reason == '1' ? 'Awaiting Caller' :
            incidentJson.result[0].hold_reason == '2' ? 'Awaiting Evidence' : incidentJson.result[0].hold_reason == '3' ? 'Awaiting Problem Resolution' : 'Awaiting Vendor' : '';

        incidentDetails = "Please find the incident details below \n 1) Incident Id - " + incidentJson.result[0].number +
            "\n 2) Category - " + incidentJson.result[0].category + " \n 3) Description - " + incidentJson.result[0].short_description +
            "\n 4) Urgency - " + (incidentJson.result[0].urgency == '1' ? 'High' : incidentJson.result[0].urgency == '2' ? 'Medium' : 'Low') +
            "\n 5) Status - " + incidentStatus + (reasonForHold != '' ? "\n 6) Reason For Hold - " + reasonForHold : '');
        app.ask(app.buildRichResponse()
            // Create a basic card and add it to the rich response
            .addSimpleResponse('Incident Recorded')
            .addBasicCard(app.buildBasicCard(incidentDetails)                
            )
        );
    }
};

//"This is a basic card.  Text in a basic card can include \"quotes\" and most other unicode characters including emoji 📱.  
//Basic cards also support some markdown formatting like * emphasis * or _italics_, **strong ** or __bold__, and ***bold itallic*** 
//or ___strong emphasis___ as well as other things like line  \nbreaks",

module.exports = googleAssistant;