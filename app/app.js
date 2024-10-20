var app = angular.module("myApp", ["ui.router", "ngCookies"]);

// Cấu hình các trạng thái
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/auth"); // Đường dẫn mặc định
  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider
    .state("auth", {
      url: "/auth",
      templateUrl: "app/views/authForm.html",
      controller: "AuthController",
    })
    .state("home", {
      url: "/home",
      templateUrl: "app/views/home.html",
      controller: "HomeController",
    })
    .state("otp", {
      url: "/otp-auth",
      templateUrl: "app/views/otpForm.html",
      controller: "OTPController",
    })
    .state("forgotPassword", {
      url: "/forgot-password",
      templateUrl: "app/views/forgotPasswordForm.html",
      controller: "forgotPasswordController",
    })
    .state("resetPassword", {
      url: "/reset-password",
      templateUrl: "app/views/resetPasswordForm.html",
      controller: "resetPasswordController",
    })
    .state("info", {
      url: "/info",
      templateUrl: "app/views/infoForm.html",
      controller: "infoController",
    })
    ;
});
