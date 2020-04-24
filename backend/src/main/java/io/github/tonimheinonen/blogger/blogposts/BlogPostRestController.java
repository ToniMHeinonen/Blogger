package io.github.tonimheinonen.blogger.blogposts;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import io.github.tonimheinonen.blogger.BloggerService;
import io.github.tonimheinonen.blogger.comments.CommentRepository;

/* 
 * 
 * Controls fetch calls to blog posts and login.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@RestController
public class BlogPostRestController {

    @Autowired
    private BloggerService bloggerService;

    @Autowired
    private BlogPostRepository blogDatabase;

    @Autowired
    private CommentRepository commentDatabase;

    /**
     * Logs in to the website.
     */
    @RequestMapping(value = "/login", method= RequestMethod.POST)
    public void login() {}

    /**
     * Fetches all of the blog posts.
     * @return all blog posts
     */
    @RequestMapping(value = "/blogposts", method= RequestMethod.GET)
    public Iterable<BlogPost> fetchBlogposts() {
        return blogDatabase.findAll();
    }

    /**
     * Fetches all of the blog posts which contain provided text.
     * @param text text to search
     * @return fetched blog posts
     */
    @RequestMapping(value = "/blogposts/search/{text}", method= RequestMethod.GET)
    public Iterable<BlogPost> searchBlogPosts(@PathVariable String text) {
        return blogDatabase.findByTopicContainsIgnoreCaseOrTextContainsIgnoreCase(text, text);
    }

    /**
     * Fetches one blogpost which has the provided id.
     * @param blogId id of the blog post
     * @return fetched blog post
     */
    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.GET)
    public BlogPost fetchBlogPost(@PathVariable Long blogId) {
        return bloggerService.getBlogPost(blogId);
    }

    /**
     * Adds new blog post.
     * @param blog provided blog post, which contains author, topic and text
     * @param b URI to create
     * @return whether adding was successfull or not
     */
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

    /**
     * Modifies the blog post which has the provided blog id.
     * @param blogId id of the blog post to modify
     * @param blog modified blog post, which contains author, topic and text
     * @param b URI to create
     * @return whether modifying the blog post was successfull or not
     */
    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.POST)
    public ResponseEntity<Void> modifyBlogPost(@PathVariable Long blogId, @RequestBody BlogPost blog, UriComponentsBuilder b) {
        BlogPost originalBlog = bloggerService.getBlogPost(blogId);

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

    /**
     * Deletes the blog post which has the given id.
     * @param blogId id of the blog post to delete
     * @return whether deletion was successfull or not
     */
    @Transactional
    @RequestMapping(value = "/blogposts/{blogId}", method= RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long blogId) {
        bloggerService.getBlogPost(blogId);

        commentDatabase.removeAllByBlogPostId(blogId);
        blogDatabase.deleteById(blogId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}