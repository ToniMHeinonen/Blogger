package io.github.tonimheinonen.blogger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.tonimheinonen.blogger.errorhandling.EntityNotFoundException;

@Service
public class BloggerService {

    @Autowired
    BlogPostRepository blogDatabase;

    @Autowired
    CommentRepository commentDatabase;

    public BlogPost getBlogPost(Long blogId) {
        BlogPost blog = blogDatabase.findById(blogId).orElse(null);

        if (blog == null)
            throw new EntityNotFoundException(BlogPost.class, "id", blogId.toString());
        
        return blog;
    }

    public Comment getComment(Long commentId) {
        Comment comment = commentDatabase.findById(commentId).orElse(null);

        if (comment == null)
            throw new EntityNotFoundException(BlogPost.class, "id", commentId.toString());
        
        return comment;
    }
}