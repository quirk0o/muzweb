package controllers;


import model.Album;
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
}
