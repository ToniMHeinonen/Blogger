package io.github.tonimheinonen.blogger.comments;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.github.tonimheinonen.blogger.blogposts.BlogPost;

/**
 * Represents a comment.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@Table(name="COMMENT")
@Entity
public class Comment {
    @Id
    @GeneratedValue
    @Column(name="ID")
    private long id;

    @Column(name="AUTHOR")
    private String author;
    @Column(name="TEXT", columnDefinition = "longtext")
    private String text;
    @Column(name="LIKES")
    private int likes;
    @Column(name="CREATIONDATE")
    private Date creationDate;
    @Column(name="LASTMODIFIED")
    private Date lastModified;

    @JsonIgnore
    @ManyToOne
    private BlogPost blogPost;

    /**
     * Default constructor for the Comment class.
     */
    public Comment() {super();}

    /**
     * Constructor for BlogPost class with necessary values.
     * @param author author of the blog post
     * @param text text content of the blog post
     * @param blogPost blog post to connect this comment to
     */
    public Comment(String author, String text, BlogPost blogPost) {
        super();
        this.author = author;
        this.text = text;
        this.likes = 0;
        this.creationDate = new Date();
        this.blogPost = blogPost;
    }

    /**
     * Returns the id of the comment.
     * @return blog post id
     */
    public long getId() {
        return id;
    }

    /**
     * Returns author of the comment.
     * @return comment author
     */
    public String getAuthor() {
        return author;
    }

    /**
     * Sets author of the comment.
     * @param author comment author
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * Returns text content of the comment.
     * @return blog post text content
     */
    public String getText() {
        return text;
    }

    /**
     * Sets text content for the comment.
     * @param text comment text content
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * Returns the amount of likes the comment has.
     * @return comment likes amount
     */
    public int getLikes() {
        return likes;
    }

    /**
     * Sets the amount of likes the comment has.
     * @param likes comment likes amount
     */
    public void setLikes(int likes) {
        this.likes = likes;
    }

    /**
     * Returns creation date of the comment.
     * @return comment creation date
     */
    public Date getCreationDate() {
        return creationDate;
    }

    /**
     * Sets creation date for the comment.
     * @param creationDate comment creation date
     */
    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    /**
     * Returns last time modified of the comment.
     * @return comment last time modified
     */
    public Date getLastModified() {
        return lastModified;
    }

    /**
     * Sets last time modified for the comment.
     * @param lastModified comment last time modified
     */
    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    /**
     * Returns the blog post this comment is connected to.
     * @return connected blog post
     */
    public BlogPost getBlogPost() {
        return blogPost;
    }

    /**
     * Sets the blog post this comment is connected to.
     * @param blogPost connected blog post
     */
    public void setBlogPost(BlogPost blogPost) {
        this.blogPost = blogPost;
    }
}