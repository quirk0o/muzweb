package model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Track extends EntityWithId{

    private String name;

    @ManyToOne
    private Author author;

    private Double rating = 0d;
    private Long voteCount = 0L;

    public Track() {
    }

    public Track(String name) {
        this.name = name;
    }

    public Track(String name, Author author) {
        this.name = name;
        this.author = author;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Double vote(int vote) {
        double wholeRating = rating * voteCount;
        rating = (wholeRating + vote) / (voteCount + 1);
        voteCount++;
        return rating;
    }
}
