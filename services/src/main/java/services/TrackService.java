package services;

import model.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import repositories.TrackRepository;

import java.util.List;


@Service
public class TrackService {

    @Autowired
    TrackRepository trackRepository;

    public List<Track> getAllTracks(int pageNumber, int pageSize) {
        List<Track> allTracks = trackRepository.findAll();
        Assert.isTrue(pageNumber * pageSize <= allTracks.size());
        return allTracks.subList(pageNumber * pageSize, Math.min((pageNumber + 1) * pageSize, allTracks.size()));
    }

    @Transactional
    public void saveTrack(Track track) {
        trackRepository.save(track);
    }

    public Track getTrackById(Long id) {
        Track track = trackRepository.findOne(id);
        Assert.notNull(track, "There is no such track");
        return track;
    }

    public Track voteForTrack(Long id, int vote) {
        Track track = getTrackById(id);
        track.vote(vote);
        saveTrack(track);
        return track;
    }

    public List<Track> searchByname(String prefix) {
        return trackRepository.findByNameStartsWith(prefix);
    }
}