package model;

import javax.persistence.Entity;
import java.sql.Time;

@Entity
public class News extends EntityWithId {

    private String title;
    private String content;
    private Time timestamp;

    public News() {
    }

    public News(String title, String content, Time timestamp) {
        this.title = title;
        this.content = content;
        this.timestamp = timestamp;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Time getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Time timestamp) {
        this.timestamp = timestamp;
    }
}