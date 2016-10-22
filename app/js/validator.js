var firstPasswordInput = document.querySelector('#new_password');
var secondPasswordInput = document.querySelector('#repeat_password');
var submit = document.querySelector('#submit');

/*
I'm using this IssueTracker to help me format my validation messages.
 */
function IssueTracker() {
  this.issues = [];
}
IssueTracker.prototype = {
  add: function (issue) {
    this.issues.push(issue);
  },
  retrieve: function () {
    var message = "";
    switch (this.issues.length) {
      case 0:
        // do nothing because message is already ""
        break;
      case 1:
        message = "Please correct the following issue:\n" + this.issues[0];
        break;
      default:
        message = "Please correct the following issues:\n" + this.issues.join("\n");
        break;
    }
    return message;
  }
};

submit.onclick = function () {
  /*
  Don't forget to grab the input's .value!
   */
  var firstPassword = firstPasswordInput.value;
  var secondPassword = secondPasswordInput.value;

  /*
  Make an issue tracker for each input because some validation messages should
  end up on the first one, some on the second.
   */
  var firstInputIssuesTracker = new IssueTracker();
  var secondInputIssuesTracker = new IssueTracker();

  /*
  This steps through all of the requirements and adds messages when a requirement fails.
  Just checks the first password because the second should be the same when it runs.
   */
  function checkRequirements() {
    if (firstPassword.length < 8) {
      firstInputIssuesTracker.add("Fewer than 8 characters");
    } else if (firstPassword.length > 20) {
      firstInputIssuesTracker.add("Greater than 20 characters");
    }

    if (!firstPassword.match(/\d/g)) {
      firstInputIssuesTracker.add("Missing a number");
    }

    if (!firstPassword.match(/[a-z]/g)) {
      firstInputIssuesTracker.add("Missing a lowercase letter");
    }

    if (!firstPassword.match(/[A-Z]/g)) {
      firstInputIssuesTracker.add("Missing an uppercase letter");
    }
  };

  /*
  Here's the first validation check. Gotta make sure they match.
   */
  if (firstPassword === secondPassword && firstPassword.length > 0) {
    /*
    They match, so make sure the rest of the requirements have been met.
     */
    checkRequirements();
  } else {
    secondInputIssuesTracker.add("Passwords don't match");
  }

  /*
  Get the validation message strings after all the requirements have been checked.
   */
  var firstInputIssues = firstInputIssuesTracker.retrieve()
  var secondInputIssues = secondInputIssuesTracker.retrieve()

  /*
  Let input.setCustomValidity() do its magic :)
   */
  firstPasswordInput.setCustomValidity(firstInputIssues);
  secondPasswordInput.setCustomValidity(secondInputIssues);
};