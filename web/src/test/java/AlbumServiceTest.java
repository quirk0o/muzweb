import app.App;
import model.Album;
import model.Author;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import services.AlbumService;
import services.AuthorService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertNotNull;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
public class AlbumServiceTest {

    @Autowired
    private AlbumService albumService;

    @Autowired
    private AuthorService authorService;

    private Author author;
    private List<Album> albumList;

    @Before
    public void setUp() {
        author = new Author("anon", "anonus");
        authorService.saveAuthor(author);

        Album album1 = new Album("Kill 'em All", "1983-07-25");
        Album album2 = new Album("Stadium Arcadium", "2006-05-05");

        albumService.saveAlbum(album1);
        albumService.saveAlbum(album2);

        albumList = new ArrayList<>();
        albumList.add(album1);
        albumList.add(album2);
    }

    @After
    public void tearDown() {
        authorService.removeAuthor(author);

        for (Album album : albumList) {
            albumService.removeAlbum(album);
        }
    }
    @Test
    public void shouldAuthorServiceFindByPrefixOfName() {
        List<Album> albumsFound1 = albumService.searchByname("Kil");
        List<Album> albumsFound2 = albumService.searchByname("Stadium");

        assert albumsFound1.contains(albumList.get(0));
        assert albumsFound2.contains(albumList.get(1));
        assert albumsFound1
                .stream()
                .filter(el -> el.getName().startsWith("Kil"))
                .count() == albumsFound1.size();
        assert albumsFound2
                .stream()
                .filter(el -> el.getName().startsWith("Stadium"))
                .count() == albumsFound2.size();
    }

    @Test
    public void shouldAddAlbums() {
        Album album1 = new Album("Kill 'em All Remastered", "1983-07-25");
        Album album2 = new Album("Stadium Arcadium Remastered", "2006-05-05");

        albumService.saveAlbum(album1);
        albumService.saveAlbum(album2);

        albumList.add(album1);
        albumList.add(album2);

        List<Album> album1Candidates = albumService.searchByname("Kil");
        List<Album> album2Candidates = albumService.searchByname("Stad");

        assert album1Candidates.contains(album1);
        assert album2Candidates.contains(album2);
    }

    @Test
    public void shouldFindById() {
        List<Album> allAlbums = albumService.getAllAlbums(1, albumList.size());

        Album toFind = allAlbums.get(0);

        Album found = albumService.getAlbumById(toFind.getId());

        assertNotNull(found);
        assert toFind.equals(found);
    }

    @Test
    public void shouldCountRatingCorrectly() {
        List<Album> allAlbums = albumService.getAllAlbums(1, albumList.size());

        Album toFind = allAlbums.get(0);

        Album found = albumService.getAlbumById(toFind.getId());

        double currentRating = found.getRating();
        found.setRating(0d);

        found = albumService.voteForAlbum(found.getId(), 5);
        found = albumService.voteForAlbum(found.getId(), 7);
        found = albumService.voteForAlbum(found.getId(), 8);
        found = albumService.voteForAlbum(found.getId(), 6);

        assert found.getRating() == 6.5d;
    }


}
