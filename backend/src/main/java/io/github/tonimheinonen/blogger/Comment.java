package io.github.tonimheinonen.blogger;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Comment {
    @Id
    @GeneratedValue
    private long id;

    @Column
    private String author;
    @Column
    private String text;
    @Column
    private int likes;
    @Column
    private Date creationDate;
    @Column
    private Date lastModified;

    @JsonIgnore
    @ManyToOne
    private BlogPost blogPost;

    public Comment() {}

    public Comment(String author, String text, BlogPost blogPost) {
        this.author = author;
        this.text = text;
        this.likes = 0;
        this.creationDate = new Date();
        this.blogPost = blogPost;
    }

    public long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public BlogPost getBlogPost() {
        return blogPost;
    }

    public void setBlogPost(BlogPost blogPost) {
        this.blogPost = blogPost;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}