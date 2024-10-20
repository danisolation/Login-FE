app.controller("HomeController", function ($scope, $cookies, $state, $http) {
  $scope.techStack = [
    {
      id: 0,
      name: "AngularJS",
      img: "assets/images/angularjs.png",
    },
    {
      id: 1,
      name: "NodeJS",
      img: "assets/images/nodejs.png",
    },
    {
      id: 2,
      name: "ExpressJS",
      img: "assets/images/expressjs.webp",
    },
    {
      id: 3,
      name: "MongoDB",
      img: "assets/images/mongodb.svg",
    },
  ];
  $scope.isLogOut = false;

  $scope.logOut = function () {
    $scope.isLogOut = true;
    $http
      .post(
        "https://loginbe.netlify.app/.netlify/functions/api/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + $cookies.get("accessToken"),
          },
        }
      )
      .then(function (response) {
        $cookies.remove('accessToken');
        Toastify({
          text: "Successful logout!",
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
});
