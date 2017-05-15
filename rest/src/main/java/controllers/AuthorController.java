package controllers;

import model.Author;
import model.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import services.AuthorService;

import java.util.List;

@RestController
@RequestMapping(value = "/authors")
@CrossOrigin(origins = "http://localhost:9000")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addAuthor(@RequestBody Author author) {
        authorService.saveAuthor(author);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Author getAuthorById(@PathVariable Long id) { return authorService.getAuthorById(id);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Author> getAllAuthors(@RequestParam(value="pgNum") int pgNum, @RequestParam(value="pgSize") int pgSize) {
        return authorService.getAllAuthors(pgNum, pgSize);
    }
}
