app.factory("authInterceptor", function ($q, $injector) {
  return {
    request: function (config) {
      const accessToken = localStorage.getItem("accessToken");

      // Add access token to headers if it exists
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },

    responseError: function (response) {
      const $http = $injector.get("$http");
      const deferred = $q.defer();

      if (
        response.status === 401 &&
        response.config.url !== "http://localhost:3000/api/auth/refreshToken"
      ) {
        $http
          .post(
            "http://localhost:3000/api/auth/refreshToken",
            {},
            { withCredentials: true }
          )
          .then(function (res) {
            $cookies.put("accessToken", response.data.accessToken);

            response.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return $http(response.config);
          })
          .then(function (retryResponse) {
            deferred.resolve(retryResponse);
          })
          .catch(function (err) {
            console.error("Refresh token failed", err);
            deferred.reject(response);
          });

        return deferred.promise;
      }

      return $q.reject(response);
    },
  };
});
