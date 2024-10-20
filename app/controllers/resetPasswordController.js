app.controller(
  "resetPasswordController",
  function ($scope, $http, $state, $cookies) {
    $scope.showNewPassword = false;
    $scope.showReTypeNewPassword = false;

    $scope.toggleNewPasswordVisibility = function () {
      $scope.showNewPassword = !$scope.showNewPassword;
    };

    $scope.toggleReTypeNewPasswordVisibility = function () {
      $scope.showReTypeNewPassword = !$scope.showReTypeNewPassword;
    };

    $scope.submit = function () {
      if ($scope.newPassword == "") {
        Toastify({
          text: "Please type your new password!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.log("Please type your new password!");
        return;
      } else if ($scope.reTypeNewPassword == "") {
        Toastify({
          text: "Please retype your new password!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.log("Please retype your new password!");
        return;
      } else if ($scope.newPassword != $scope.reTypeNewPassword) {
        Toastify({
          text: "Your password does not match!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.error("Your password does not match!");
        return;
      }
      const email = $cookies.get("email");
      const data = {
        email: email,
        newPassword: $scope.newPassword,
      };
      $http
        .post("https://loginbe.netlify.app/.netlify/functions/api/resetPassword", data)
        .then(function (response) {
          Toastify({
            text: "The password has been reset. Please log in again!",
            duration: 3000,
            position: "center",
            backgroundColor: "#4CAF50",
            close: true,
          }).showToast();
          console.log(response.data);
          $state.go("auth");
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
