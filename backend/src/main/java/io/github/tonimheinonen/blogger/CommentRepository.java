package io.github.tonimheinonen.blogger;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

/**
 * Handles Comment repository calls.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
interface CommentRepository extends CrudRepository<Comment, Long> {
    
    /**
     * Searched comments by provided blog post id.
     * @param id blog id the comment needs to be connected to
     * @return
     */
    List<Comment> findByBlogPostId(Long id);

    /**
     * Removes all comments connected to provided blog post id.
     * @param id blog id the comment needs to be connected to
     */
    void removeAllByBlogPostId(Long id);

    /**
     * Searches comments by provided blog post id and text.
     * @param id blog id the comment needs to be connected to
     * @param text text content to search
     * @return fetched comments
     */
    List<Comment> findByBlogPostIdAndTextContainsIgnoreCase(Long id, String text);
}