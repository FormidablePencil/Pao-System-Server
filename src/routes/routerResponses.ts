export enum router_responses {
  invalid_credentials = 'invalid credentials',
  user_exists = 'user already exists',
  signed_out = 'successfully signed out',
  signed_out_with_err = 'signout failed. Token does not exist',
  refresh_token_invalid = 'refresh token invalid'
}
