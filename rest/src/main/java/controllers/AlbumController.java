package controllers;


import model.Album;
import model.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import services.AlbumService;

import java.util.List;

@RestController
@RequestMapping(value = "/albums")
@CrossOrigin(origins = "http://localhost:9000")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addAlbum(@RequestBody Album album) {
        albumService.saveAlbum(album);
    }

    @RequestMapping(value = "/vote/{id}", method = RequestMethod.PUT)
    public Album voteForAlbum(@PathVariable Long id, @RequestParam(value="vote") int vote) {
        return albumService.voteForAlbum(id, vote);
    }

    @RequestMapping(value ="/search/{prefix}", method = RequestMethod.GET)
    public List<Album> searchByPrefix(@PathVariable String prefix) {
        return prefix != null ? albumService.searchByname(prefix) :
                albumService.searchByname("");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Album getAlbumById(@PathVariable Long id) {
        return albumService.getAlbumById(id);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Album> getAllAlbums(@RequestParam(value="pgNum") int pgNum, @RequestParam(value="pgSize") int pgSize) {
        return albumService.getAllAlbums(pgNum, pgSize);
    }

    @RequestMapping(value = "/{id}/tracks", method = RequestMethod.GET)
    public List<Track> getTracks(@PathVariable(value="id") Long id) {
        return albumService.getAlbumById(id).getTracks();
    }
}
