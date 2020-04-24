package io.github.tonimheinonen.blogger.errorhandling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class EntityExceptionController {
   @ExceptionHandler(value = EntityNotFoundException.class)
   public ResponseEntity<Object> exception(EntityNotFoundException exception) {
      return new ResponseEntity<>("Value not found", HttpStatus.NOT_FOUND);
   }
}