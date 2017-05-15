package repositories;

import model.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrackRepository extends JpaRepository<Track, Long> {

    @Query("Select track from Track track where track.name like ?1%")
    List<Track> findByNameStartsWith(String prefix);
}
