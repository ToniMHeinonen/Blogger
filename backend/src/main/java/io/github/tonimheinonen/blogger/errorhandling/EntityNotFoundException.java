package io.github.tonimheinonen.blogger.errorhandling;

import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

/**
 * Handles creating the EntityNotFoundException.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
public class EntityNotFoundException extends RuntimeException {

    /**
     * Creates EntityNotFoundException.
     * @param clazz class which was not found
     * @param searchParamsMap searched parameters
     */
    public EntityNotFoundException(Class clazz, String... searchParamsMap) {
        super(EntityNotFoundException.generateMessage(clazz.getSimpleName(), toMap(String.class, String.class, searchParamsMap)));
    }

    /**
     * Generates error message when entity was not found.
     * @param entity name of the entity which was not found
     * @param searchParams used parameters for searching the entity
     * @return compiled string of error
     */
    private static String generateMessage(String entity, Map<String, String> searchParams) {
        return StringUtils.capitalize(entity) +
                " was not found for parameters " +
                searchParams;
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