package io.github.tonimheinonen.blogger;

import org.springframework.beans.factory.annotation.Autowired;
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
    public BlogPost fetchCustomer(@PathVariable long blogId) {
        return database.findById(blogId).get();
    }
}