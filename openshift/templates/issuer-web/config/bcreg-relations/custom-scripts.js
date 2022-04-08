/* Include all your custom JS code in here, it will be available to the app instance */

function setDateFields(survey) {
  var currentDateFields = ["issue_date"];

  var now = new Date();
  currentDateFields.forEach(function (dateField) {
    survey.setValue(dateField, new Intl.DateTimeFormat("en-CA").format(now));
    survey.getQuestionByName(dateField).readOnly = true;
  });

  // Set value from received claim
  var orgRegistrationDate = survey.getValue("registrationDate");
  survey.setValue("relationshipEffectiveDate", orgRegistrationDate);
  survey.setValue("registrationDate", "");
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
