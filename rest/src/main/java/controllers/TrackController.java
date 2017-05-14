package controllers;


import model.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import services.TrackService;

import java.util.List;

@RestController
@RequestMapping(value = "/tracks")
public class TrackController {

    @Autowired
    private TrackService trackService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addTrack(@RequestBody Track track) {
        trackService.saveTrack(track);
    }

    @RequestMapping(value = "/vote/{id}", method = RequestMethod.PUT)
    public Track voteForTrack(@PathVariable Long id, @RequestParam(value="vote") int vote) {
        return trackService.voteForTrack(id, vote);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Track getTrackById(@PathVariable Long id) {
        return trackService.getTrackById(id);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Track> getAllTracks(@RequestParam(value="pgNum") int pgNum, @RequestParam(value="pgSize") int pgSize) {
        return trackService.getAllTracks(pgNum, pgSize);
    }
}
