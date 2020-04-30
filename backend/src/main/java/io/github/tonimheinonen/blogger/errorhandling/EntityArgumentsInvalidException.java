package io.github.tonimheinonen.blogger.errorhandling;

import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

/**
 * Handles creating the EntityArgumentsInvalidException.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
public class EntityArgumentsInvalidException extends RuntimeException {

    /**
     * Creates EntityArgumentsInvalid.
     * @param clazz class which was trying to be created
     * @param entityParamsMap parameters for creating entity
     */
    public EntityArgumentsInvalidException(Class clazz, String... entityParamsMap) {
        super(EntityArgumentsInvalidException.generateMessage(clazz.getSimpleName(), toMap(String.class, String.class, entityParamsMap)));
    }

    /**
     * Generates error message when entity was not created correctly.
     * @param entity name of the entity
     * @param searchParams used parameters for creating the entity
     * @return compiled string of error
     */
    private static String generateMessage(String entity, Map<String, String> entityParams) {
        return StringUtils.capitalize(entity) +
                " did not find required fields: " +
                entityParams;
    }

    /**
     * Creates a map of error parameters.
     * @param <K> class of key
     * @param <V> class of value
     * @param keyType key for the error
     * @param valueType value for the error
     * @param entries error parameters
     * @return created map of error parameters
     */
    private static <K, V> Map<K, V> toMap(Class<K> keyType, Class<V> valueType, Object... entries) {
        if (entries.length % 2 == 1)
            throw new IllegalArgumentException("Invalid entries");

        return IntStream.range(0, entries.length / 2).map(i -> i * 2)
                .collect(HashMap::new,
                        (m, i) -> m.put(keyType.cast(entries[i]), valueType.cast(entries[i + 1])),
                        Map::putAll);
    }

}