const UserConstants = Object.freeze({
  MESSAGES: {
    USER_ALREADY_REGISTERED: "User with this username/email already exists",
    LOGIN_FAILED: "Something went wrong while login user. Please try again.",
    SIGN_UP_FAILED: "Something went wrong while sign up. Please try again.",
    INVALID_ACCESS_TOKEN: "Invalid access token provided.",
    USER_VALIDATION_FAILURE: "No active user with these credentials exists",
    SIGN_UP_SUCCESS: "User created successfuly",
    USER_NOT_FOUND: "User not found",
    FETCHING_USER_FAILED: "User details could not be fetched",
    INVALID_PASSWORD: "Invalid password provided for this account"
  },
});

export default UserConstants;
