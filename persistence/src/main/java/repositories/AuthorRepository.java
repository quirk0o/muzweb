package repositories;

import model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author, Long> {

    @Query("Select author from Author author where author.firstName like ?1% or author.lastName like ?1%")
    List<Author> findByNameStartsWith(String prefix);
}
