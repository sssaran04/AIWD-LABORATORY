$(document).ready(function() {
    
    var urlParams = new URLSearchParams(window.location.search);
    var eventName = urlParams.get('event');
    
    if (eventName) {
        $("#eventName").val(eventName);
    }

    $("#submitBtn").click(function(e) {
        e.preventDefault();
        
        clearErrors();
        var isValid = true;

        var participantName = $("#participantName").val().trim();
        if (participantName === "") {
            $("#nameError").text("Participant Name is required");
            $("#participantName").css("border-color", "#dc3545");
            isValid = false;
        } else {
            $("#participantName").css("border-color", "#ddd");
        }

        var email = $("#email").val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            $("#emailError").text("Email is required");
            $("#email").css("border-color", "#dc3545");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $("#emailError").text("Invalid email format");
            $("#email").css("border-color", "#dc3545");
            isValid = false;
        } else {
            $("#email").css("border-color", "#ddd");
        }

        var mobileNumber = $("#mobileNumber").val().trim();
        if (mobileNumber === "") {
            $("#mobileError").text("Mobile Number is required");
            $("#mobileNumber").css("border-color", "#dc3545");
            isValid = false;
        } else if (!/^\d{10,}$/.test(mobileNumber)) {
            $("#mobileError").text("Mobile Number must contain only digits (minimum 10)");
            $("#mobileNumber").css("border-color", "#dc3545");
            isValid = false;
        } else {
            $("#mobileNumber").css("border-color", "#ddd");
        }

        if (isValid) {
            var successMsg = "Registration Successful for " + participantName;
            $("#successMessage").text(successMsg).css({
                "background-color": "#d4edda",
                "color": "#155724",
                "border": "1px solid #c3e6cb",
                "display": "block"
            });

            $("#submitBtn").prop("disabled", true).text("Registered");
            
            $("#participantName").prop("disabled", true);
            $("#email").prop("disabled", true);
            $("#mobileNumber").prop("disabled", true);
        }
    });

    $("#resetBtn").click(function() {
        $("#registrationForm")[0].reset();
        clearErrors();
        $("#successMessage").text("").css("display", "none");
        $("#submitBtn").prop("disabled", false).text("Submit");
        
        $("#participantName").prop("disabled", false);
        $("#email").prop("disabled", false);
        $("#mobileNumber").prop("disabled", false);
        
        if (urlParams.get('event')) {
            $("#eventName").val(urlParams.get('event'));
        }
    });

    function clearErrors() {
        $(".error-message").text("");
        $("#participantName").css("border-color", "#ddd");
        $("#email").css("border-color", "#ddd");
        $("#mobileNumber").css("border-color", "#ddd");
        $("#successMessage").text("").css("display", "none");
    }
});
