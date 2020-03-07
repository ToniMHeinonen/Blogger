package io.github.tonimheinonen.blogger.errorhandling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler {
    @ExceptionHandler(CannotFindBlogPostException.class)
    public ResponseEntity<ErrorInfo> handleConflict(CannotFindBlogPostException ex) {
        ErrorInfo e = new ErrorInfo("Could not found location with id " + ex.getBlogPostId());
        return new ResponseEntity<ErrorInfo>(e, HttpStatus.NOT_FOUND);
    }
}