package controllers;

import model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import services.NewsService;

import java.util.List;

@RestController
@RequestMapping(value = "/news")
@CrossOrigin(origins = "http://localhost:9000")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addNews(@RequestBody News news) {
        newsService.saveNews(news);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public News getNewsById(@PathVariable Long id) { return newsService.getNewsById(id);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<News> getAllNews(@RequestParam(value="pgNum") int pgNum, @RequestParam(value="pgSize") int pgSize) {
        return newsService.getAllNews(pgNum, pgSize);
    }
}