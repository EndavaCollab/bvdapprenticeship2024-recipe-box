package com.endava.recipebox.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ErrorResponse {
    private String message;
    private int statusCode;

    public ErrorResponse(String message, int statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
