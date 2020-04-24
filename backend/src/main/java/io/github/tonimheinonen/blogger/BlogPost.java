package io.github.tonimheinonen.blogger;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Represents a blog post.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@Table(name="BLOGPOST")
@Entity
public class BlogPost {
    @Id
    @GeneratedValue
    @Column(name="ID")
    private long id;

    @Column(name="AUTHOR")
    private String author;
    @Column(name="TOPIC")
    private String topic;
    @Column(name="TEXT", columnDefinition = "longtext")
    private String text;
    @Column(name="CREATIONDATE")
    private Date creationDate;
    @Column(name="LASTMODIFIED")
    private Date lastModified;

    /**
     * Default constructor for BlogPost class.
     */
    public BlogPost() {super();}

    /**
     * Constructor for BlogPost class with necessary values.
     * @param author author of the blog post
     * @param topic topic of the blog post
     * @param text text content of the blog post
     */
    public BlogPost(String author, String topic, String text) {
        super();
        this.author = author;
        this.topic = topic;
        this.text = text;
        this.creationDate = new Date();
    }

    /**
     * Returns id of the blog post.
     * @return blog post id
     */
    public long getId() {
        return id;
    }

    /**
     * Returns the author of the blog post.
     * @return blog post author
     */
    public String getAuthor() {
        return author;
    }

    /**
     * Sets the author of the blog post.
     * @param author blog post author
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * Returns topic of the blog post.
     * @return blog post topic
     */
    public String getTopic() {
        return topic;
    }

    /**
     * Sets topic of the blog post.
     * @param topic topic to set
     */
    public void setTopic(String topic) {
        this.topic = topic;
    }

    /**
     * Returns text content of the blog post.
     * @return blog post text content
     */
    public String getText() {
        return text;
    }

    /**
     * Sets text content for the blog post.
     * @param text blog post content
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * Returns creation date of the blog post.
     * @return blog post creation date
     */
    public Date getCreationDate() {
        return creationDate;
    }

    /**
     * Sets creation date for the blog post.
     * @param creationDate blog post creation date
     */
    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    /**
     * Returns last modifation date of the blog post.
     * @return blog post modifation date
     */
    public Date getLastModified() {
        return lastModified;
    }

    /**
     * Sets the latest modifation date for the blog post.
     * @param lastModified blog post last modifation date
     */
    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }
}