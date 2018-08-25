// @flow

const initQuery = '';
const authQuery = '';

class AccountKitWebClient {
  client: *

  constructor(client: *) {
    this.client = client;
  }

  init() {
    return this.client.query(initQuery)
  }

  auth(csrfNonce: string, authCode: string) {
    return this.client.query(authQuery, {csrfNonce, authCode})
  }

  phoneLogin = (countryCode: string, phone: string) => {
    return new Promise((resolve, reject) => {
      window.AccountKit.login('PHONE', {
        countryCode: countryCode,
        phoneNumber: phone,
      }, (res) => {
        if (res.status === 'PARTIALLY_AUTHENTICATED') {
          resolve({
            status: res.status,
            authCode: res.code,
            csrfNonce: res.state,
          });
        }
        else {
          reject({status: res.status});
        }
      });
    });
  }

  emailLogin = (email: string) => {
    return new Promise((resolve, reject) => {
      window.AccountKit
        .login('EMAIL', {emailAddress: email}, (res) => {
          if (res.status === 'PARTIALLY_AUTHENTICATED') {
            resolve({
              status: res.status,
              authCode: res.code,
              csrfNonce: res.state,
            });
          }
          else {
            reject({status: res.status});
          }
        });
    });
  }
}

export default AccountKitWebClient;
