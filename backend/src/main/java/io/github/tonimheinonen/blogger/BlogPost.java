package io.github.tonimheinonen.blogger;

import java.sql.Date;

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

    public BlogPost(String topic, String text, Date creationDate) {
        this.topic = topic;
        this.text = text;
        this.creationDate = creationDate;
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

    @Override
    public String toString() {
        return "BlogPost [creationDate=" + creationDate + ", id=" + id + ", text=" + text + ", topic=" + topic + "]";
    }
}