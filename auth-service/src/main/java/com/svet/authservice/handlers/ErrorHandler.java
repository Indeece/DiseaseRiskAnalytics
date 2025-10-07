package com.svet.authservice.handlers;

public class ErrorHandler {
    public static class UserAlreadyExistsException extends Exception {
        public UserAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class UserCreationException extends Exception {
        public UserCreationException(String message) {
            super(message);
        }
    }
}
