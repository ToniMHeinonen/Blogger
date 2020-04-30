package io.github.tonimheinonen.blogger.errorhandling;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.http.HttpStatus;

/**
 * Represents an error message.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
class ApiError {

    private HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private String message;
    private String debugMessage;
    private List<ApiValidationError> subErrors;
 
    /**
     * Private constructor for setting timestamp to current time.
     */
    private ApiError() {
        timestamp = LocalDateTime.now();
    }
 
    /**
     * Constructor for setting http status.
     * @param status status to set
     */
    ApiError(HttpStatus status) {
        this();
        this.status = status;
    }
 
    /**
     * Constructor for setting unexpected error message.
     * @param status https status
     * @param ex expection
     */
    ApiError(HttpStatus status, Throwable ex) {
        this();
        this.status = status;
        this.message = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }
 
    /**
     * Constructor for setting error with custom message.
     * @param status http status
     * @param message custom message
     * @param ex exception
     */
    ApiError(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }

    /**
     * Returns http status.
     * @return http status
     */
    public HttpStatus getStatus() {
        return status;
    }

    /**
     * Sets http status.
     * @param status http status
     */
    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    /**
     * Returns error timestamp.
     * @return error timestamp
     */
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    /**
     * Sets error timestamp.
     * @param timestamp error timestamp
     */
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    /**
     * Returns error message.
     * @return error message
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets error message.
     * @param message error message
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Returns debug message.
     * @return debug message
     */
    public String getDebugMessage() {
        return debugMessage;
    }

    /**
     * Sets debug message.
     * @param debugMessage debug message
     */
    public void setDebugMessage(String debugMessage) {
        this.debugMessage = debugMessage;
    }

    /**
     * Returns sub errors.
     * @return sur errors
     */
    public List<ApiValidationError> getSubErrors() {
        return subErrors;
    }

    /**
     * Sets sub errors.
     * @param subErrors sub errors
     */
    public void setSubErrors(List<ApiValidationError> subErrors) {
        this.subErrors = subErrors;
    }
 }