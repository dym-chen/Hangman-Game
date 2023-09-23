const {google} = require('googleapis'); 
const keys = require('./keys.json')

const client =  new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){

    if(err) {
        console.log(err);
        return;
    } else {
        console.log('Connected!');
        gsrun(client);
    }
});

async function gsrun(cl) {

    const gsapi = google.sheets({version: 'v4', auth: cl});

    const opt = {
        spreadsheetId: '1GCyuI3NULE99KUNRgzXity91CFIfYMoCQRC3gndG82s',
        range: 'Sheet1!A2:B6' //Read the two values
    }

    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;  
    let values = ['Debbie','Zhao']  
    dataArray.push(values);

    console.log(dataArray);

    const updateOptions = {
        spreadsheetId: '1GCyuI3NULE99KUNRgzXity91CFIfYMoCQRC3gndG82s',
        range: 'Sheet1!E2',
        valueInputOption: 'USER_ENTERED',
        resource: {values: dataArray}
      }
      
      let res = await gsapi.spreadsheets.values.update(updateOptions); //update the google sheets at range using newDataArray
}