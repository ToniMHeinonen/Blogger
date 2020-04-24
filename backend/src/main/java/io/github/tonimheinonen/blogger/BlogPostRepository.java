package io.github.tonimheinonen.blogger;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

/**
 * Handles Blog Post repository calls.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
interface BlogPostRepository extends CrudRepository<BlogPost, Long> {
    
    /**
     * Searches blog posts by provided topic and text.
     * @param topic topic to search
     * @param text text content to search
     * @return fetched blog posts
     */
    List<BlogPost> findByTopicContainsIgnoreCaseOrTextContainsIgnoreCase(String topic, String text);
}