package io.github.tonimheinonen.blogger.errorhandling;

/**
 * Handles creating the EntityArgumentsInvalidException.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
public class EntityArgumentsInvalidException extends RuntimeExceptionParent {

    /**
     * Creates EntityArgumentsInvalid.
     * @param clazz class which was trying to be created
     * @param entityParamsMap parameters for creating entity
     */
    public EntityArgumentsInvalidException(Class clazz, String... entityParamsMap) {
        super(EntityArgumentsInvalidException.generateMessage(clazz.getSimpleName(),
        " did not find required fields: ",
        toMap(String.class, String.class, entityParamsMap)));
    }
}