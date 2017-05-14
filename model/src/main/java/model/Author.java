package model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Author extends EntityWithId {

    private String firstName;
    private String lastName;

    @OneToMany
    @JoinColumn(name="track_id")
    private List<Track> trackList;

    private Double rating = 0d;

    public Author() {
    }

    public Author(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        trackList = new ArrayList<>();
    }

    public void addTrack(Track track) {
        trackList.add(track);
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
}
