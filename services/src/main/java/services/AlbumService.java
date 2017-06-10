package services;

import model.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import repositories.AlbumRepository;

import java.util.List;


@Service
public class AlbumService {

    @Autowired
    AlbumRepository albumRepository;

    public List<Album> getAllAlbums(int pageNumber, int pageSize) {
        List<Album> allAlbums = albumRepository.findAll();
        Assert.isTrue(pageNumber * pageSize <= allAlbums.size());
        return allAlbums.subList(pageNumber * pageSize, Math.min((pageNumber + 1) * pageSize, allAlbums.size()));
    }

    @Transactional
    public void saveAlbum(Album album) {
        albumRepository.save(album);
    }

    public Album getAlbumById(Long id) {
        Album album = albumRepository.findOne(id);
        Assert.notNull(album, "There is no such album");
        return album;
    }

    public Album voteForAlbum(Long id, int vote) {
        Album album = getAlbumById(id);
        album.vote(vote);
        saveAlbum(album);
        return album;
    }

    public List<Album> searchByname(String prefix) {
        return albumRepository.findByNameStartsWith(prefix);
    }

    public void removeAlbum(Album album) {
        albumRepository.delete(album);
    }
}