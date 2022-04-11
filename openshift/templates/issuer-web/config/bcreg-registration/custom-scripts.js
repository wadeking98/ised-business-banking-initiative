/* Include all your custom JS code in here, it will be available to the app instance */

function getRandomBusinessID() {
  var prefixList = ["BC"];
  var randomPrefix = Math.floor(
    Math.random() * Math.floor(prefixList.length - 1)
  );
  var randomNumber = Math.floor(Math.random() * Math.floor(999999));
  return `${prefixList[randomPrefix]}${randomNumber}`;
}

function getRandomBN() {
  return `${Math.floor(Math.random() * Math.floor(999999999))}`;
}

function setDateFields(survey) {
  var currentDateFields = [
    "registrationDate",
    "legalNameEffectiveDate",
    "homeJurisdictionLegalNameEffectiveDate",
    "issueDate",
  ];

  var now = new Date();
  currentDateFields.forEach(function (dateField) {
    survey.setValue(dateField, new Intl.DateTimeFormat("en-CA").format(now));
    survey.getQuestionByName(dateField).readOnly = true;
  });
  
}

function populateFields() {
  var survey = this.survey;
  // Populate BC id number
  var verified_organization_key = "orgID";
  survey.setValue(verified_organization_key, getRandomBusinessID());
  survey.getQuestionByName(verified_organization_key).readOnly = true;
  console.log("BC company identifier set");

  // Populate 9-digit BN
  var business_number = "CRABusinessNumber";
  survey.setValue(business_number, getRandomBN());
  survey.getQuestionByName(business_number).readOnly = true;
  console.log("Business Number set");

  // Set date fields
  setDateFields(survey);
  console.log("Date field set");
}

/* An array containing custom functions that will be automatically registered with
 * SurveyJS so that they can be used in triggers.
 */
surveyFunctions = [populateFields];
