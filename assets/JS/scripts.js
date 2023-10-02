const phone = document.querySelector("#phone-number");

const iti = window.intlTelInput(phone, {
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
  initialCountry: "auto",
  autoPlaceholder: "aggressive",
  separateDialCode: true,
  formatOnDisplay: true,
  nationalMode: false,

  geoIpLookup: function (callback) {
    fetch("https://ipapi.co/json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        callback(data.country_code);
      })
      .catch(function () {
        callback();
      });
  },
});

// Hide both overlays initially
document.getElementById("loader-overlay").style.display = "none";
document.getElementById("success-overlay").style.display = "none";

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const isPossible = iti.isPossibleNumber();
  if (isPossible) {
    phone.value = iti.getNumber();
    const formData = new FormData(this);

    const firstName = formData.get("First Name");
    const lastName = formData.get("Last Name");

    const fullName = firstName + " " + lastName;

    // Append "Full Name" to the form data
    formData.append("Full Name", fullName);

    // Show the loader overlay
    document.getElementById("loader-overlay").style.display = "flex";

    fetch(
      "https://script.google.com/macros/s/AKfycbxsZRNJPDOZARMqICs4i5wuetmh_g1pDbgCItg3F_lBlx-ivQzg7G-d9Ugh9yVKwmtBfg/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Hide the loader overlay
        document.getElementById("loader-overlay").style.display = "none";

        if (data.result === "success") {
          // Show the success message
          document.getElementById("success-overlay").style.display = "flex";

          setTimeout(() => {
            // Hide the success message after 3 seconds
            document.getElementById("success-overlay").style.display = "none";
          }, 3000);
          document.getElementById("contact-form").reset();
          console.clear();
        } else {
          alert("An error occurred");
        }
      })
      .catch((error) => {
        // console.error("Error", error);
        alert("An error occurred");
      });
  } else {
    alert("Please enter a valid Phone Number");
  }
});
