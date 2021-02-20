/* Include all your custom JS code in here, it will be available to the app instance */

function setCurrentDate(params) {
  if (params.length < 1) {
    throw new Error(
      "setCurrentDate is missing one or more required parameters"
    );
  }
  var dateField = params[0];
  var survey = this.survey;

  var date = new Date();
  survey.setValue(dateField, new Intl.DateTimeFormat('en-CA').format(date));
  survey.getQuestionByName(dateField).readOnly = true;
}

function setFutureDate(params) {
  if (params.length < 2) {
    throw new Error(
      "setFutureDate is missing one or more required parameters"
    );
  }
  var dateField = params[0];
  var baseDate = params[1];
  var survey = this.survey;
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = survey.getValue(baseDate).split('-')[1];
  var day = survey.getValue(baseDate).split('-')[2];
  var date = new Date(year + 5, month, day);
  survey.setValue(dateField, new Intl.DateTimeFormat('en-CA').format(date));
  survey.getQuestionByName(dateField).readOnly = true;
}

/* An array containing custom functions that will be automatically registered with
* SurveyJS so that they can be used in triggers.
*/
surveyFunctions = [setCurrentDate, setFutureDate];
