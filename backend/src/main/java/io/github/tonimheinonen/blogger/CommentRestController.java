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

@RestController
public class CommentRestController {
    
    @Autowired
    BlogPostRepository blogDatabase;

    @Autowired
    CommentRepository commentDatabase;

    @RequestMapping(value = "/comments/{blogId}", method= RequestMethod.GET)
    public Iterable<Comment> fetchComments(@PathVariable long blogId) {
        return commentDatabase.findByBlogPostId(blogId);
    }

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
}