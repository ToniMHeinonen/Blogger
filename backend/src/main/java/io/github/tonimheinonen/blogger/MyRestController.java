package io.github.tonimheinonen.blogger;

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
    BlogPostRepository database;

    @RequestMapping(value = "/blogposts", method= RequestMethod.GET)
    public Iterable<BlogPost> fetchBlogposts() {
        return database.findAll();
    }

    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.GET)
    public BlogPost fetchBlogPosts(@PathVariable long blogId) {
        return database.findById(blogId).get();
    }

    @RequestMapping(value = "/blogposts", method= RequestMethod.POST)
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost blog, UriComponentsBuilder b) {
        database.save(blog);

        UriComponents uriComponents =
                b.path("/blogposts/{id}").buildAndExpand(blog.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBlogPost(@PathVariable long blogId) {
        database.deleteById(blogId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}