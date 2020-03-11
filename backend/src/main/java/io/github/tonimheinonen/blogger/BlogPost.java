package io.github.tonimheinonen.blogger;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class BlogPost {
    @Id
    @GeneratedValue
    private long id;

    private String topic;
    private String text;
    private Date creationDate;
    private Date lastModified;

    public BlogPost() {}

    public BlogPost(String topic, String text) {
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

    @Override
    public String toString() {
        return "BlogPost [creationDate=" + creationDate + ", id=" + id + ", lastModified=" + lastModified + ", text="
                + text + ", topic=" + topic + "]";
    }
}