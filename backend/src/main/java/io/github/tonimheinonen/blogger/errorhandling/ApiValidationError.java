package io.github.tonimheinonen.blogger.errorhandling;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Handles creating api validation errors.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
class ApiValidationError {
   private String object;
   private String field;
   private Object rejectedValue;
   private String message;

   /**
    * Creates an ApiValidationError.
    * @param object name of the object with failed validation
    * @param message error message
    */
   ApiValidationError(String object, String message) {
       this.object = object;
       this.message = message;
   }
}