package io.github.tonimheinonen.blogger.errorhandling;

/**
 * Handles creating the EntityNotFoundException.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
public class EntityNotFoundException extends RuntimeExceptionParent {

    /**
     * Creates EntityNotFoundException.
     * @param clazz class which was not found
     * @param searchParamsMap searched parameters
     */
    public EntityNotFoundException(Class clazz, String... searchParamsMap) {
        super(RuntimeExceptionParent.generateMessage(clazz.getSimpleName(),
         " was not found for parameters ",
          toMap(String.class, String.class, searchParamsMap)));
    }
}