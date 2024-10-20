app.controller("AuthController", function ($scope, $http, $state, $cookies) {
  $scope.isLogin = true;
  $scope.isFirstAccess = true;
  $scope.showPassword = false;
  $scope.showReTypePassword = false;

  $scope.changeForm = function () {
    $scope.isFirstAccess = false;
    $scope.isLogin = !$scope.isLogin;
    $scope.email = "";
    $scope.password = "";
    $scope.reTypePassword = "";
  };

  $scope.togglePasswordVisibility = function () {
    $scope.showPassword = !$scope.showPassword;
  };

  $scope.toggleReTypePasswordVisibility = function () {
    $scope.showReTypePassword = !$scope.showReTypePassword;
  };


  $scope.forgot = function () {
    $state.go("forgotPassword");
  };

  $scope.submit = function () {
    if ($scope.isLogin) {
      if (!$scope.email) {
        Toastify({
          text: "Please type your email!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.error("Please type your email!");
        return;
      } else if (!$scope.password) {
        Toastify({
          text: "Please type your password!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.error("Please type your password!");
        return;
      }
      const data = {
        email: $scope.email,
        password: $scope.password,
      };

      $http
        .post("https://loginbe.netlify.app/.netlify/functions/api/login", data)
        .then(function (response) {
          Toastify({
            text: "User logined. Check your email for OTP!",
            duration: 3000,
            position: "center",
            backgroundColor: "#4CAF50",
            close: true,
          }).showToast();
          console.log("Sign up successful", response.data);
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
          console.log("Login error", error);
        });
    } else {
      if (!$scope.email) {
        Toastify({
          text: "Please type your email!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        return;
      } else if (!$scope.reTypePassword) {
        Toastify({
          text: "Please type your password!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.error("Please type your password!");
        return;
      } else if ($scope.reTypePassword != $scope.password) {
        Toastify({
          text: "Your password does not match!",
          duration: 3000,
          position: "center",
          backgroundColor: "#FF0000",
          close: true,
        }).showToast();
        console.error("Your password does not match!");
      }

      const data = {
        email: $scope.email,
        password: $scope.password,
      };

      $http
        .post("https://loginbe.netlify.app/.netlify/functions/api/register", data)
        .then(function (response) {
          Toastify({
            text: "User registered. Check your email for OTP!",
            duration: 3000,
            position: "center",
            backgroundColor: "#4CAF50",
            close: true,
          }).showToast();
          console.log("Sign up successful", response.data);
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
          console.log("Sign up error", error);
        });
    }
  };
});
