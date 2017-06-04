package repositories;

import model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("Select album from Album album where album.name like ?1%")
    List<Album> findByNameStartsWith(String prefix);
}
