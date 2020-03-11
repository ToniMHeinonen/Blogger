package io.github.tonimheinonen.blogger;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {
    @Id
    @GeneratedValue
    private long id;

    private String text;
    private int likes;
    private Date creationDate;
    private Date lastModified;

    public Comment() {}

    public Comment(String text) {
        this.text = text;
        this.likes = 0;
        this.creationDate = new Date();
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

    @Override
    public String toString() {
        return "Comment [creationDate=" + creationDate + ", id=" + id + ", lastModified=" + lastModified + ", likes="
                + likes + ", text=" + text + "]";
    }
}