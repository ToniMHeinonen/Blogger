package io.github.tonimheinonen.blogger;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Controls fetch calls to comments.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@RestController
public class CommentRestController {
    
    @Autowired
    BlogPostRepository blogDatabase;

    @Autowired
    CommentRepository commentDatabase;

    /**
     * Fetches all of the comments with provided blog id.
     * @param blogId id of the blog to get comments from
     * @return all fecthed comments
     */
    @RequestMapping(value = "/comments/{blogId}", method= RequestMethod.GET)
    public Iterable<Comment> fetchComments(@PathVariable long blogId) {
        return commentDatabase.findByBlogPostId(blogId);
    }

    /**
     * Fetches all of the comments which contain provided text and blog id.
     * @param blogId id of the blog to get comments from
     * @param text text to search
     * @return fetched comments
     */
    @RequestMapping(value = "/comments/{blogId}/search/{text}", method= RequestMethod.GET)
    public Iterable<Comment> searchComments(@PathVariable long blogId, @PathVariable String text) {
        return commentDatabase.findByBlogPostIdAndTextContainsIgnoreCase(blogId, text);
    }

    /**
     * Adds new comment to the provided blog id.
     * @param blogId id of the blog to add comment to
     * @param comment provided comment, which contains author and text
     * @param b URI to create
     * @return whether adding was successfull or not
     */
    @RequestMapping(value = "/comments/{blogId}", method= RequestMethod.POST)
    public ResponseEntity<Void> addComment(@PathVariable long blogId, @RequestBody Comment comment, UriComponentsBuilder b) {
        BlogPost blogPost = blogDatabase.findById(blogId).orElse(null);
        comment.setCreationDate(new Date());
        comment.setBlogPost(blogPost);
        commentDatabase.save(comment);

        UriComponents uriComponents =
                b.path("/comments/{id}").buildAndExpand(comment.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    /**
     * Modifies the blog post which has the provided blog id.
     * @param commentId id of the comment to modify
     * @param comment modified comment, which contains author and text
     * @param b URI to create
     * @return whether modifying the comment was successfull or not
     */
    @RequestMapping(value = "/comments/modify/{commentId}", method= RequestMethod.POST)
    public ResponseEntity<Void> modifyComment(@PathVariable long commentId, @RequestBody BlogPost comment, UriComponentsBuilder b) {
        Comment originalComment = commentDatabase.findById(commentId).orElse(null);
        originalComment.setText(comment.getText());
        originalComment.setLastModified(new Date());

        commentDatabase.save(originalComment);

        UriComponents uriComponents =
                b.path("/comments/modify/{commentId}").buildAndExpand(originalComment.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    /**
     * Adds one like to the provided comment id.
     * @param commentId id of the comment to like
     * @param b URI to create
     * @return whether liking the comment was successfull or not
     */
    @RequestMapping(value = "/comments/like/{commentId}", method= RequestMethod.POST)
    public ResponseEntity<Void> likeComment(@PathVariable long commentId, UriComponentsBuilder b) {
        Comment comment = commentDatabase.findById(commentId).orElse(null);
        int curLikes = comment.getLikes();
        comment.setLikes(curLikes + 1);
        commentDatabase.save(comment);

        UriComponents uriComponents =
                b.path("/comments/{id}").buildAndExpand(comment.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    /**
     * Deletes the comment which has the given id.
     * @param commentId id of the comment to delete
     * @return whether deletion was successfull or not
     */
    @RequestMapping(value = "/comments/{commentId}", method= RequestMethod.DELETE)
    public ResponseEntity<Void> deleteComment(@PathVariable long commentId) {
        commentDatabase.deleteById(commentId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}