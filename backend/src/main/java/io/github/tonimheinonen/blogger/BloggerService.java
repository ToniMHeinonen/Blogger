package io.github.tonimheinonen.blogger;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.tonimheinonen.blogger.errorhandling.EntityArgumentsInvalidException;
import io.github.tonimheinonen.blogger.errorhandling.EntityNotFoundException;
import io.github.tonimheinonen.blogger.blogposts.BlogPost;
import io.github.tonimheinonen.blogger.blogposts.BlogPostRepository;
import io.github.tonimheinonen.blogger.comments.Comment;
import io.github.tonimheinonen.blogger.comments.CommentRepository;

/**
 * Handles single blog post and comment retrieval.
 * Throws an error if id is not found.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@Service
public class BloggerService {

    @Autowired
    BlogPostRepository blogDatabase;

    @Autowired
    CommentRepository commentDatabase;

    /**
     * Checks if blog post with given id exists.
     * 
     * If blog post does not exist, throws EntityNotFoundException
     * @param blogId id of the blog to load
     * @return retrieved blog
     */
    public BlogPost getBlogPost(Long blogId) {
        BlogPost blog = blogDatabase.findById(blogId).orElse(null);

        if (blog == null)
            throw new EntityNotFoundException(BlogPost.class, "id", blogId.toString());
        
        return blog;
    }

    /**
     * Checks if comment with given id exists.
     * 
     * If comment does not exist, throws EntityNotFoundException
     * @param commentId id of the comment to load
     * @return retrieved comment
     */
    public Comment getComment(Long commentId) {
        Comment comment = commentDatabase.findById(commentId).orElse(null);

        if (comment == null)
            throw new EntityNotFoundException(BlogPost.class, "id", commentId.toString());
        
        return comment;
    }

    /**
     * Throws an error if provided blog post is not valid.
     * @param blog provided blog post
     */
    public void checkIsBlogPostValid(BlogPost blog) {
        ArrayList<String> errors = new ArrayList<>();

        if (blog.getAuthor() == null) {
            errors.add("author");
            errors.add(null);
        }
        
        if (blog.getTopic() == null) {
            errors.add("topic");
            errors.add(null);
        }

        if (blog.getText() == null) {
            errors.add("text");
            errors.add(null);
        }

        // If error were found, throw an error with error parameters
        if (!errors.isEmpty()) {
            throw new EntityArgumentsInvalidException(BlogPost.class, errors.toArray(new String[errors.size()]));
        }
    }

    /**
     * Throws an error if provided comment is not valid.
     * @param comment provided comment
     */
    public void checkIsCommentValid(Comment comment) {
        ArrayList<String> errors = new ArrayList<>();

        if (comment.getAuthor() == null) {
            errors.add("author");
            errors.add(null);
        }

        if (comment.getText() == null) {
            errors.add("text");
            errors.add(null);
        }

        // If error were found, throw an error with error parameters
        if (!errors.isEmpty()) {
            throw new EntityArgumentsInvalidException(Comment.class, errors.toArray(new String[errors.size()]));
        }
    }
}