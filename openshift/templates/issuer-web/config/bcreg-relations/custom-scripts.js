/* Include all your custom JS code in here, it will be available to the app instance */

function setDateFields(survey) {
  var currentDateFields = ["issue_date"];
  var futureDateFields = ["expiration_date"];

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var future = new Date(year + 1, month, day);
  currentDateFields.forEach(function (dateField) {
    survey.setValue(dateField, new Intl.DateTimeFormat("en-CA").format(now));
    survey.getQuestionByName(dateField).readOnly = true;
  });
  futureDateFields.forEach(function (dateField) {
    survey.setValue(dateField, new Intl.DateTimeFormat("en-CA").format(future));
    survey.getQuestionByName(dateField).readOnly = true;
  });

  // Set value from received claim
  var orgRegistrationDate = survey.getValue("registration_date");
  survey.setValue("relationship_status_effective", orgRegistrationDate);
  survey.setValue("registration_date", "");
}

function populateFields() {
  var survey = this.survey;
  // Set date fields
  setTimeout(function () {
    setDateFields(survey), 750;
  });
  console.log("Date fields set");
}

/* An array containing custom functions that will be automatically registered with
 * SurveyJS so that they can be used in triggers.
 */
surveyFunctions = [populateFields];
