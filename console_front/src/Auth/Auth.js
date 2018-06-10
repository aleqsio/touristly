import auth0 from 'auth0-js';


export default class Auth {
  // ...


  constructor() {
    this.instance=new auth0.WebAuth({
      domain: 'touristly.eu.auth0.com',
      clientID: 'y96nl44D-KChry9FrAYXcSjl1xMVj9pa',
      redirectUri: 'http://localhost:3000/loginhandler',
      audience: 'https://touristly.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile',
      claims:'profile email picture'
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setSession = this.setSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.userProfile=false;
  }

  handleAuthentication() {
    let self=this;
    this.instance.parseHash(function (err, authResult) {
      console.log(window.location.hash);
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        self.setSession(authResult);
      } else if (err) {
        // handle errors
      }
    });


  }

  getProfile(callback) {
    if (!this.userProfile) {
      var accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        console.log('Access Token must exist to fetch profile');
        return false
      }
      console.log(callback);
      this.instance.client.userInfo(accessToken,callback);
    }
  }

  getIdToken() {
    return localStorage.getItem('id_token');
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log("tresjid");
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    window.location="/flights"
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    window.location="/"
  }

  login() {
    this.instance.authorize();
  }


  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
