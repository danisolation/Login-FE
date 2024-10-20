app.controller(
  "forgotPasswordController",
  function ($scope, $http, $state, $cookies) {
    $scope.change = function () {
      $state.go("auth");
    };

    $scope.submit = function () {
      if ($scope.email == "") {
        Toastify({
          text: "Please type your email!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.error("Please type your email!");
        return;
      }
      const data = {
        email: $scope.email,
      };
      $http
        .post("https://loginbe.netlify.app/.netlify/functions/api/forgotPassword", data)
        .then(function (response) {
          Toastify({
            text: "Check your email for OTP!",
            duration: 3000,
            position: "center",
            backgroundColor: "#4CAF50",
            close: true,
          }).showToast();
          console.log(response.data);
          $cookies.put("email", $scope.email);
          $state.go("otp");
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
  }
);
