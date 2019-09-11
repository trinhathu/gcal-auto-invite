var CAL_ID = '<YOUR_CALENDAR_ID>';
var EVENT_ID = '<YOUR_EVENT_ID>';

function onFormSubmit(e) {
  sendInvite(e.response.getRespondentEmail());
}

function sendInvite(email) {
  var calendarId = CAL_ID;
  var decoded = Utilities.base64Decode(EVENT_ID);
  var eventId = Utilities.newBlob(decoded).getDataAsString().split(' ')[0];

  var event = Calendar.Events.get(calendarId, eventId);

  if (event.attendees) {
    event.attendees.push({
      email: email
    });
  } else {
    event.attendees = new Array({ email: email });
  }

  event = Calendar.Events.patch(event, calendarId, eventId, {
    sendNotifications: true
  });
}
