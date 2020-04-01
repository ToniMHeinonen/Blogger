package io.github.tonimheinonen.blogger;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

interface BlogPostRepository extends CrudRepository<BlogPost, Long> {
    List<BlogPost> findByTopicContainsIgnoreCaseOrTextContainsIgnoreCase(String topic, String text);
}