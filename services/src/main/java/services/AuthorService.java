package services;


import model.Author;
import model.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import repositories.AuthorRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Transactional
    public void saveAuthor(Author author) {
        authorRepository.save(author);
    }

    public Author getAuthorById(Long id) {
        Author author = authorRepository.findOne(id);
        Assert.notNull(author, "There is no such author");
        return author;
    }

    public List<Author> getAllAuthors(int pageNumber, int pageSize) {
        List<Author> allAuthors = authorRepository.findAll();
        Assert.isTrue(pageNumber * pageSize <= allAuthors.size());
        return allAuthors.subList(pageNumber * pageSize, Math.min((pageNumber + 1) * pageSize, allAuthors.size()));
    }

    public List<Author> searchByname(String prefix) {
        return authorRepository.findByNameStartsWith(prefix);
    }

    public void removeAuthor(Author author) {
        authorRepository.delete(author);
    }
}
