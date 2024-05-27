package com.hcc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class InvalidStatusChangeException extends RuntimeException{

    private static final long serialVersionUID = 2L;

    public InvalidStatusChangeException(String message) {
        super(message);
    }
}