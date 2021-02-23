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

function setDirectorData(survey) {
  var nameField = "director_001_full_name";
  var firstName = survey.getValue("given_names");
  var lastName = survey.getValue("family_name");
  survey.setValue(nameField, `${lastName}, ${firstName}`);
  survey.getQuestionByName(nameField).readOnly = false;

  var addressFields = [
    "street_address",
    "city",
    "province",
    "country",
    "postal_code",
  ];
  addressFields.forEach(function (addressField) {
    // Read and reset default address value
    var value = survey.getValue(addressField);
    survey.setValue(addressField, "");
    survey.getQuestionByName(addressField).readOnly = false;
    survey.getQuestionByName(addressField).setPropertyValue("value", "");

    // Set address for director 1
    survey.setValue("director_001_" + addressField, value);
    survey.getQuestionByName("director_001_" + addressField).readOnly = false;
  });
  console.log("Director data updated");
}

function setDateFields(survey) {
  var currentDateFields = [
    "registration_date",
    "registered_legal_name_effective",
    "home_jurisdiction_legal_name_effective",
    "entity_status_effective",
    "registration_renewal_effective_date",
    "issue_date",
  ];
  var futureDateFields = ["registration_expiry_date", "expiration_date"];

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
}

function populateFields() {
  var survey = this.survey;
  // Populate BC id number
  var verified_organization_key = "verified_organization_key";
  survey.setValue(verified_organization_key, getRandomBusinessID());
  survey.getQuestionByName(verified_organization_key).readOnly = true;
  console.log("BC company identifier set");

  // Populate 9-digit BN
  var business_number = "business_number";
  survey.setValue(business_number, getRandomBN());
  survey.getQuestionByName(business_number).readOnly = true;
  console.log("Business Number set");

  // Reset default company address, and set the address to the first director
  // The function call must be delayed so that it will run AFTER the global survey initialization
  setTimeout(function () {
    setDirectorData(survey);
  }, 1000);

  // Set date fields
  setDateFields(survey);
  console.log("Date field set");
}

/* An array containing custom functions that will be automatically registered with
 * SurveyJS so that they can be used in triggers.
 */
surveyFunctions = [populateFields];
