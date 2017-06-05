package model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Track extends EntityWithId{

    private String name;

    @ManyToOne
    @JoinColumn(name="album_id")
    private Album album;

    private Double rating = 0d;
    private Long voteCount = 0L;
    private String description = "";

    public Track() {
    }

    public Track(String name) {
        this.name = name;
    }

    public Track(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double vote(int vote) {
        double wholeRating = rating * voteCount;
        rating = (wholeRating + vote) / (voteCount + 1);
        voteCount++;
        return rating;
    }

}
