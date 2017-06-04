package model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Author extends EntityWithId {

    private String firstName;
    private String lastName;

    @OneToMany(mappedBy = "author")
    @JsonIgnoreProperties("author")
    private List<Track> trackList;

    @OneToMany(mappedBy = "author")
    @JsonManagedReference
    private List<Album> albumList;

    private Double rating = 0d;

    public Author() {
    }

    public Author(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        trackList = new ArrayList<>();
        albumList = new ArrayList<>();
    }

    public void addTrack(Track track) {
        trackList.add(track);
    }

    public void addAlbum(Album album) {
        albumList.add(album);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<Track> getTrackList() {
        return trackList;
    }

    public void setTrackList(List<Track> trackList) {
        this.trackList = trackList;
    }

    public List<Album> getAlbumList() {
        return albumList;
    }

    public void setAlbumList(List<Album> albumList) {
        this.albumList = albumList;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
