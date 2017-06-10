import app.App;
import model.Author;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import services.AuthorService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
public class AuthorServiceTest {

    @Autowired
    private AuthorService authorService;

    private List<Author> authors;

    @Before
    public void setUp() {
        Author author1 = new Author("anon", "anonus");
        Author author2 = new Author("nona", "sunona");

        authorService.saveAuthor(author1);
        authorService.saveAuthor(author2);

        authors = new ArrayList<>();
        authors.add(author1);
        authors.add(author2);
    }

    @After
    public void tearDown() {
        for(Author author : authors) {
            authorService.removeAuthor(author);
        }
    }

    @Test
    public void shouldAuthorServiceFindByPrefixOfName() {
        List<Author> authorsFound1 = authorService.searchByname("an");
        List<Author> authorsFound2 = authorService.searchByname("no");

        assert authorsFound1.contains(authors.get(0));
        assert authorsFound2.contains(authors.get(1));
        assert authorsFound1
                .stream()
                .filter(el -> el.getFirstName().startsWith("an"))
                .count() == authorsFound1.size();
        assert authorsFound2
                .stream()
                .filter(el -> el.getFirstName().startsWith("no"))
                .count() == authorsFound2.size();
    }

    @Test
    public void shouldAddAuthors() {
        Author author1 = new Author("anon1", "anonus");
        Author author2 = new Author("nona1", "sunona");

        authorService.saveAuthor(author1);
        authorService.saveAuthor(author2);

        authors.add(author1);
        authors.add(author2);

        List<Author> author1Candidates = authorService.searchByname("anon1");
        List<Author> author2Candidates = authorService.searchByname("nona1");

        assert author1Candidates.contains(author1);
        assert author2Candidates.contains(author2);
    }

    @Test
    public void shouldFindById() {
        List<Author> allAuthors = authorService.getAllAuthors(1, authors.size());

        Author toFind = allAuthors.get(0);

        Author found = authorService.getAuthorById(toFind.getId());

        assertNotNull(found);
        assert toFind.equals(found);
    }


}
