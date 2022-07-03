export const bsgAPI = {
  signIn(deviceName, onSuccess, onFailure) {
    if (!deviceName) {
      if (onFailure) {
        onFailure(new Error("Device name is required"));
      }
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Device: {
        PlatformCode: "WEB",
        Name: deviceName,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://thebetter.bsgroup.eu/Authorization/SignIn", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("API returned status code != 200");
      })
      .then(onSuccess)
      .catch(onFailure);
  },

  getMediaList(token, mediaListId, pageSize, onSuccess, onFailure) {
    if (!token) {
      if (onFailure) {
        onFailure(new Error("Token is required"));
      }
      return;
    }

    if (!mediaListId) {
      if (onFailure) {
        onFailure(new Error("Media List Id is required"));
      }
      return;
    }

    if (!pageSize) {
      if (onFailure) {
        onFailure(new Error("Page size is required"));
      }
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      MediaListId: mediaListId,
      IncludeCategories: false,
      IncludeImages: true,
      IncludeMedia: false,
      PageNumber: 1,
      PageSize: pageSize,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://thebetter.bsgroup.eu/Media/GetMediaList", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("API returned status code != 200");
      })
      .then(onSuccess)
      .catch(onFailure);
  },

  getMediaPlayInfo(token, mediaId, onSuccess, onFailure) {
    if (!token) {
      if (onFailure) {
        onFailure(new Error("Token is required"));
      }
      return;
    }

    if (!mediaId) {
      if (onFailure) {
        onFailure(new Error("Media Id is required"));
      }
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
      MediaId: mediaId,
      StreamType: "TRIAL",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("API returned status code != 200");
      })
      .then(onSuccess)
      .catch(onFailure);
  },
};
