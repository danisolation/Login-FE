app.controller("OTPController", function ($scope, $state, $cookies, $http) {
  $scope.otp = ["", "", "", "", "", ""];

  $scope.moveToNext = function (index) {
    if ($scope.otp[index].length >= 1) {
      // Move to the next input
      const nextInput = document.querySelectorAll(".otp-input")[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  $scope.submit = function () {
    const email = $cookies.get("email");
    let otp = "";
    for (let i = 0; i < 6; i++) {
      if ($scope.otp[i] == "") {
        Toastify({
          text: "1, 2, 3, 5 You missed some note!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.error("1, 2, 3, 5 You missed some note!");
        return;
      }
      otp += $scope.otp[i];
    }
    const data = {
      email: email,
      otp: otp,
    };
    $http
      .post("https://loginbe.netlify.app/.netlify/functions/api/verifyOTP", data, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        switch (response.data.reason) {
          case 1:
            Toastify({
              text: "Verified OTP!",
              duration: 3000,
              position: "center",
              backgroundColor: "#4CAF50",
              close: true,
            }).showToast();
            $cookies.put("accessToken", response.data.accessToken);
            $state.go("info");
            break;
          case 2:
            Toastify({
              text: "Verified OTP!",
              duration: 3000,
              position: "center",
              backgroundColor: "#4CAF50",
              close: true,
            }).showToast();
            $cookies.put("accessToken", response.data.accessToken);
            $state.go("home");
            break;
          case 3:
            Toastify({
              text: "Verified OTP!",
              duration: 3000,
              position: "center",
              backgroundColor: "#4CAF50",
              close: true,
            }).showToast();
            $state.go("resetPassword");
            break;
        }
      })
      .catch(function (error) {
        Toastify({
          text: error.data.message,
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.log("Something went wrong. Please try again.", error);
      });
  };
});
