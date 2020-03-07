package io.github.tonimheinonen.blogger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyRestController {

    @Autowired
    BlogPostRepository database;

    @RequestMapping(value = "/blogposts", method= RequestMethod.GET)
    public Iterable<BlogPost> fetchBlogposts() {
        return database.findAll();
    }

    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.GET)
    public BlogPost fetchBlogPosts(@PathVariable long blogId) {
        return database.findById(blogId).get();
    }

    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogId) {
        database.deleteById(blogId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}