package repositories;

import model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AuthorRepository extends JpaRepository<Author, Long> {

    /*@Query("select author from Author author left join fetch author.trackList tl where author.id = ?1")
    Author findOne(long id);*/
}
