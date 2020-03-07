package io.github.tonimheinonen.blogger;

import java.util.ArrayList;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BloggerApplication implements CommandLineRunner  {

	@Autowired
    BlogPostRepository database;

	private static Log logger = LogFactory.getLog(BloggerApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BloggerApplication.class, args);
		logger.info("Creators: Olli Ahonen & Toni Heinonen");
	}

	@Override
	public void run(String... args) throws Exception {
		// If there are no blogposts, create couple default blog posts
		if (database.count() == 0) {
			ArrayList<BlogPost> posts = new ArrayList<>();

			posts.add(new BlogPost("Kevät", "Oli kaunis kevätsää, mutta tosiaan, missä se talvi olikaan?"));
			posts.add(new BlogPost("Koulu", "Minne meni koulu, vai oliko sittenkin joulu?"));
			posts.add(new BlogPost("Projekti", "Yksi kaksi, oho niitä olikin kolme, vaiko sittenkin neljä?"));

			database.saveAll(posts);
		}
	}
}
