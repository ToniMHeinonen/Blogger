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
public class MyRestController {

    @Autowired
    BlogPostRepository blogDatabase;

    @Autowired
    CommentRepository commentDatabase;

    /*-------- BLOG POSTS --------*/

    @RequestMapping(value = "/blogposts", method= RequestMethod.GET)
    public Iterable<BlogPost> fetchBlogposts() {
        return blogDatabase.findAll();
    }

    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.GET)
    public BlogPost fetchBlogPost(@PathVariable long blogId) {
        return blogDatabase.findById(blogId).get();
    }

    @RequestMapping(value = "/blogposts", method= RequestMethod.POST)
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost blog, UriComponentsBuilder b) {
        blog.setCreationDate(new Date());
        blogDatabase.save(blog);

        UriComponents uriComponents =
                b.path("/blogposts/{id}").buildAndExpand(blog.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.POST)
    public ResponseEntity<Void> modifyBlogPost(@PathVariable long blogId, @RequestBody BlogPost blog, UriComponentsBuilder b) {
        BlogPost originalBlog = blogDatabase.findById(blogId).orElse(null);
        originalBlog.setTopic(blog.getTopic());
        originalBlog.setText(blog.getText());
        originalBlog.setLastModified(new Date());

        blogDatabase.save(originalBlog);

        UriComponents uriComponents =
                b.path("/blogposts/{id}").buildAndExpand(originalBlog.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogId) {
        blogDatabase.deleteById(blogId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    /*-------- COMMENTS --------*/

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