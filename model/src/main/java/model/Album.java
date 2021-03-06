package model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Album extends EntityWithId {

    private String name;
    private String description;
    private String releaseDate;
    private Double rating = 0d;
    private Long voteCount = 0L;

    @ManyToOne
    @JoinColumn(name="author_id")
    private Author author;

    @OneToMany(mappedBy = "album")
    @JsonIgnoreProperties("album")
    private List<Track> tracks;

    public Album() {
    }

    public Album(String name, String releaseDate) {
        this.name = name;
        this.releaseDate = releaseDate;
        tracks = new ArrayList<>();
    }

    public void addTrack(Track track) {
        tracks.add(track);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public Double vote(int vote) {
        double wholeRating = rating * voteCount;
        rating = (wholeRating + vote) / (voteCount + 1);
        voteCount++;
        return rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Album album = (Album) o;

        if (!name.equals(album.name)) return false;
        if (!releaseDate.equals(album.releaseDate)) return false;
        return author != null ? author.equals(album.author) : album.author == null;
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + releaseDate.hashCode();
        result = 31 * result + (author != null ? author.hashCode() : 0);
        return result;
    }
}
