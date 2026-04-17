$(document).ready(function() {
    
    $(".toggle-details-btn").click(function() {
        var eventDiv = $(this).closest(".event");
        var detailsDiv = eventDiv.find(".event-details");
        
        detailsDiv.slideToggle(300);
        
        if ($(this).text() === "Show Details") {
            $(this).text("Hide Details");
        } else {
            $(this).text("Show Details");
        }
        
        eventDiv.css("background-color", "#e8f4f8");
        
        var eventTitle = eventDiv.find("h3");
        eventTitle.css({
            "color": "#667eea",
            "text-shadow": "0 0 5px rgba(102, 126, 234, 0.3)"
        });
    });

    $(".toggle-details-btn").click(function() {
        var eventTitle = $(this).closest(".event").find("h3").text();
        alert("Event: " + eventTitle);
    });

    $(".register-btn").click(function() {
        var eventDiv = $(this).closest(".event");
        var eventTitle = eventDiv.find("h3").text();
        
        window.location.href = "registration.html?event=" + encodeURIComponent(eventTitle);
    });
});
