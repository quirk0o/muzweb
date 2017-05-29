package services;


import model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import repositories.NewsRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Transactional
    public void saveNews(News news) {
        newsRepository.save(news);
    }

    public News getNewsById(Long id) {
        News news = newsRepository.findOne(id);
        Assert.notNull(news, "There is no such news");
        return news;
    }

    public List<News> getAllNews(int pageNumber, int pageSize) {
        List<News> allNews= newsRepository.findAll();
        Assert.isTrue(pageNumber * pageSize <= allNews.size());
        return allNews.subList(pageNumber * pageSize, Math.min((pageNumber + 1) * pageSize, allNews.size()));
    }
}
