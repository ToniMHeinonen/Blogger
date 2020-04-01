package io.github.tonimheinonen.blogger;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

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
    @Column(name="TEXT")
    private String text;
    @Column(name="CREATIONDATE")
    private Date creationDate;
    @Column(name="LASTMODIFIED")
    private Date lastModified;

    public BlogPost() {super();}

    public BlogPost(String author, String topic, String text) {
        super();
        this.author = author;
        this.topic = topic;
        this.text = text;
        this.creationDate = new Date();
    }

    public long getId() {
        return id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}