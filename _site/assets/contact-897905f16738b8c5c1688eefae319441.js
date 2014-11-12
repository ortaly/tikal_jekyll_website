$(document).ready(function() {

  $("#contact-form").validate({
    errorPlacement: function(error, element) {
      error.appendTo("#clientsidevalidation-contact-form-errors ul");
    },
    wrapper: "li",
    onkeyup: false,
    onfocusout: false,
    onsubmit: true,
    errorElement: "label",
    messages: {
        "name": "Name field is required.",
        "email_address": "Email field is required.",
        "skills": "Skills field is required.",
        "title": "Title field is required.",
        "tell_us_about_yourself": "Tell us about yourself field is required.",
        "company": "Company field is required",
        "tell_us_about_your_need": "Tell us about your need field is required"
      }
  });

  $('#contact-form').submit(function() {
    var form = $(this);
    $("#clientsidevalidation-contact-form-errors ul").html("");
    if (form.valid()){
      $("#clientsidevalidation-contact-form-errors").css("display", "none");
    } else {
      $("#clientsidevalidation-contact-form-errors").css("display", "");
    }
  });


  $("#contact-form #edit-submitted-form-topic").change(function() {
    mail = $("#contact-form #edit-submitted-form-topic").val();
    // Update action url for Brace service (include relevant email address to sent mail to)
    form = document.getElementById('contact-form');
    form.action = "//forms.brace.io/" + mail;
    // if selected topic is 'info' type
    if (mail.indexOf("info") > -1){
      $("#contact-form #webform-component-form--domain").css("display", "");
      $("#contact-form #webform-component-form--company").css("display", "");
      $("#contact-form #webform-component-form--skills").css("display", "none");
      $("#contact-form #webform-component-form--tell-us-about-your-need").css("display", "");
      $("#contact-form #webform-component-form--tell-us-about-yourself").css("display", "none");
      $("#contact-form #webform-component-form--tell-us-about-yourself #edit-submitted-form-tell-us-about-yourself").val("");
    }
    else if (mail.indexOf("jobs") > -1){
      $("#contact-form #webform-component-form--domain").css("display", "none");
      // Reset domain radio buttons
      $.each($("#contact-form #webform-component-form--domain input"), function( index, value ) {
        value.checked = false;
      });
      $("#contact-form #webform-component-form--company").css("display", "none");
      $("#contact-form #webform-component-form--company #edit-submitted-form-company").val("");
      $("#contact-form #webform-component-form--skills").css("display", "");
      $("#contact-form #webform-component-form--tell-us-about-your-need").css("display", "none");
      $("#contact-form #webform-component-form--tell-us-about-your-need #edit-submitted-form-tell-us-about-your-need").val("");
      $("#contact-form #webform-component-form--tell-us-about-yourself").css("display", "");
    }
  });

});
