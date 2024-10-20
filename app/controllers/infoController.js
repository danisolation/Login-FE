app.controller("infoController", function ($scope, $http, $state, $cookies) {
  $scope.submit = function () {
    if ($scope.fullName == "") {
      Toastify({
        text: "Please type your full name!",
        duration: 3000,
        position: "center",
        backgroundColor: "#FF0000",
        close: true,
      }).showToast();
      console.log("Please enter your full name!");
      return;
    } else if ($scope.phone == "") {
      Toastify({
        text: "Please type your phone number!",
        duration: 3000,
        position: "center",
        backgroundColor: "#FF0000",
        close: true,
      }).showToast();
      console.log("Please retype your phone number!");
      return;
    } else if ($scope.birth == "") {
      Toastify({
        text: "Please type your birth!",
        duration: 3000,
        position: "center",
        backgroundColor: "#FF0000",
        close: true,
      }).showToast();
      console.log("Please retype your birth!");
      return;
    }
    const email = $cookies.get("email");
    const data = {
      email: email,
      fullName: $scope.fullName,
      phone: $scope.phone,
      birth: $scope.birth,
    };
    $http
      .put("https://loginbe.netlify.app/.netlify/functions/api/updateUser", data, {
        headers: {
          Authorization: "Bearer " + $cookies.get("accessToken"),
        },
      })
      .then(function (response) {
        Toastify({
          text: "Successful information entry!",
          duration: 3000,
          position: "center",
          backgroundColor: "#4CAF50",
          close: true,
        }).showToast();
        console.log(response.data);
        $state.go("home");
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
