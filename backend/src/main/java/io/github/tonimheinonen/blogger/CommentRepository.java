package io.github.tonimheinonen.blogger;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByBlogPostId(Long id);
}