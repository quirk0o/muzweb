package model;

import javax.persistence.Entity;
import java.util.Date;

@Entity
public class News extends EntityWithId {

    private String title;
    private String content;
    private Long timestamp;

    public News() {
    }

    public News(String title, String content, Long timestamp) {
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

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}