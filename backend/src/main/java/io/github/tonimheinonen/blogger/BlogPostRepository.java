package io.github.tonimheinonen.blogger;

import org.springframework.data.repository.CrudRepository;

interface BlogPostRepository extends CrudRepository<BlogPost, Long> {

}